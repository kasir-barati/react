import {
  CreatedMessageDto,
  CreateMessageDto,
  GetAllMessagesQueryString,
  PaginatedWithSeekMethodGetMessages,
  User,
} from '@react/common';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { myFetch } from '../../utils/my-fetch.util';
import styles from './ChatBox.module.css';

interface ChatBoxProps {
  contact?: User;
  user: User;
}

const MESSAGE_FETCH_LIMIT = 10;

export function ChatBox({ contact, user }: Readonly<ChatBoxProps>) {
  const { data, error, isLoading, refetch } = useInfiniteQuery({
    queryKey: ['messages', contact?.id],
    enabled: Boolean(contact?.id),
    initialPageParam: {
      limit: MESSAGE_FETCH_LIMIT,
      senderId: user.id,
      receiverId: contact?.id ?? '',
      // Undefined values are skipped in myFetch
      // In this case backend will send the very first page.
      currentCreatedAt: undefined,
      currentMessageId: undefined,
    },
    getNextPageParam: (
      lastPage: PaginatedWithSeekMethodGetMessages,
    ) => lastPage.nextPage,
    queryFn: ({ pageParam }) =>
      myFetch<
        PaginatedWithSeekMethodGetMessages,
        GetAllMessagesQueryString
      >({
        endpoint: 'http://localhost:3333/messages',
        queryStrings: pageParam,
      }),
  });
  const [message, setMessage] = useState<string>('');
  const { mutate } = useMutation({
    mutationFn: (body: Readonly<CreateMessageDto>) =>
      myFetch<CreatedMessageDto, CreateMessageDto, CreateMessageDto>({
        endpoint: 'http://localhost:3333/messages',
        method: 'put',
        body,
      }),
  });
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }
  function handleClick() {
    if (!message || message?.trim()?.length <= 0) {
      toast('trying to send empty message!', { type: 'warning' });
      return;
    }

    assertContact(contact);

    toast('Sending message...', { type: 'info' });
    mutate({ content: message, receiverId: contact.id });
    refetch();
    setMessage('');
  }

  if (error) {
    console.log(error);
    return <h2>Error ...</h2>;
  }
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <section className={styles['right-panel']}>
      {contact && (
        <>
          <section className={styles['history']}>
            {data &&
              data.pages.map(({ data: messages }) => {
                return messages.map((message) => {
                  if (message.senderId === user.id) {
                    return (
                      <p className={styles['history__me']}>
                        My message
                      </p>
                    );
                  }
                  return (
                    <p className={styles['history__they']}>
                      Their message
                    </p>
                  );
                });
              })}
          </section>
          <form className={styles['chat-box']}>
            <textarea
              value={message}
              className={styles['chat-box__message']}
              placeholder={`Chat with ${contact?.name}`}
              onChange={handleChange}
              name="message"
            ></textarea>
            <button
              type="button"
              className={styles['chat-box__send-message']}
              onClick={handleClick}
            >
              &#9654;
            </button>
          </form>
        </>
      )}
    </section>
  );
}

function assertContact(contact?: User): asserts contact is User {
  if (!contact) {
    throw 'UndefinedContact';
  }
}
