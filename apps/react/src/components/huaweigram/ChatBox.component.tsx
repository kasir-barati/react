import {
  CreatedMessageDto,
  CreateMessageDto,
  GetAllMessagesQueryString,
  PaginatedWithSeekMethodGetMessages,
  User,
} from '@react/common';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { getQueryClient } from '../../utils/get-query-client.util';
import { myFetch } from '../../utils/my-fetch.util';
import styles from './ChatBox.module.css';

const queryClient = getQueryClient();

interface ChatBoxProps {
  contact?: User;
  user: User;
}

const MESSAGE_FETCH_LIMIT = 10;

export function ChatBox({ contact, user }: Readonly<ChatBoxProps>) {
  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery({
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
  const lastMessageRef = useRef<HTMLParagraphElement>(null);
  const messagesWrapperRef = useRef<HTMLElement>(null);
  const [isLastMessageHidden, setIsLastMessageHidden] =
    useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: (body: Readonly<CreateMessageDto>) =>
      myFetch<CreatedMessageDto, CreateMessageDto, CreateMessageDto>({
        endpoint: 'http://localhost:3333/messages',
        method: 'put',
        body,
      }),
    // https://stackoverflow.com/a/78662140/8784518
    onSuccess: (newMessage) => {
      queryClient.setQueryData(
        ['messages', contact?.id],
        (
          oldMessages: InfiniteData<
            PaginatedWithSeekMethodGetMessages,
            unknown
          >,
        ) => {
          const firstPage = oldMessages?.pages[0];

          if (firstPage) {
            return {
              ...oldMessages,
              pages: [
                {
                  ...firstPage,
                  data: [newMessage, ...firstPage.data],
                } satisfies PaginatedWithSeekMethodGetMessages,
                ...oldMessages.pages.slice(1),
              ],
            };
          }
        },
      );
    },
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
    mutateAsync({ content: message, receiverId: contact.id }).then(
      () => {
        setMessage('');
        // Hate this setTimeout but without it is gonna scroll too soon!
        setTimeout(() => {
          showLastMessage();
        }, 100);
      },
    );
  }
  function handleClickScrollToLastMessage() {
    showLastMessage();
  }
  function showLastMessage() {
    if (isLastMessageElement(lastMessageRef.current)) {
      lastMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLastMessageHidden(entry.isIntersecting);
      },
      {
        root: messagesWrapperRef.current,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );
    if (lastMessageRef.current) {
      // Hate this setTimeout but without it is gonna scroll too soon!
      setTimeout(() => {
        showLastMessage();
      }, 100);
      observer.observe(lastMessageRef.current);
    }

    return () => {
      if (lastMessageRef.current) {
        observer.unobserve(lastMessageRef.current);
      }
    };
  }, []);

  if (error) {
    console.log(error);
    return <h2>Error ...</h2>;
  }
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  // TODO: On scroll up fetch previous pages.
  const messagesElements = data
    ? data.pages
        .map(({ data: messages }, pageIndex) => {
          return [...messages].reverse().map((message) => {
            const createdAt = DateTime.fromISO(
              message.createdAt,
            ).toObject();

            if (message.senderId === user.id) {
              return (
                <p key={message.id} className={styles['history__me']}>
                  {message.content}
                  <br />
                  <time dateTime={message.createdAt}>
                    {createdAt.month}.{createdAt.day} -{' '}
                    {createdAt.hour}:{createdAt.minute}
                  </time>
                </p>
              );
            }
            return (
              <p key={message.id} className={styles['history__they']}>
                {message.content}
              </p>
            );
          });
        })
        .flat()
    : undefined;

  return (
    <section className={styles['right-panel']}>
      {contact && (
        <>
          <section
            ref={messagesWrapperRef}
            className={styles['history']}
          >
            {messagesElements}
            <span
              role="none"
              className={styles.hide}
              ref={lastMessageRef}
            ></span>
            <button
              onClick={handleClickScrollToLastMessage}
              className={classNames(
                styles['scroll-to-last-message'],
                {
                  [styles.hide]: isLastMessageHidden,
                },
              )}
            >
              &darr;
            </button>
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
function isLastMessage(
  pageIndex: number,
  messageIndex: number,
  messagesLength: number,
) {
  return pageIndex === 0 && messageIndex === messagesLength - 1;
}
function isLastMessageElement(
  lastMessageElement: HTMLParagraphElement | null,
): lastMessageElement is HTMLParagraphElement {
  return Boolean(lastMessageElement);
}
