import { FilterUsersQueryString, User } from '@react/common';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useTitle } from '../../hooks/use-title.hook';
import { myFetch } from '../../utils/my-fetch.util';
import { ChatBox } from './ChatBox.component';
import { ContactList } from './ContactList.component';
import styles from './Huaweigram.module.css';

// Fetch it from global state/backend.
const me: User = {
  id: '754cf10b-d3a3-4851-af9a-11ad51dc8357',
  name: 'Mohammad Jawad',
  email: 'kasir.barati@gmail.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function Huaweigram() {
  const [searchedName, setSearchedName] = useState('');
  const { error, data: contacts } = useQuery({
    queryKey: ['users', searchedName],
    enabled: searchedName.length > 0,
    queryFn: () =>
      myFetch<User[], FilterUsersQueryString>({
        endpoint: 'http://localhost:3333/users',
        queryStrings: {
          name: searchedName,
        },
      }),
  });
  const [to, setTo] = useState(contacts && contacts[0]);
  useTitle('Huaweigram');

  function handleSelect(contact: User) {
    setTo(contact);
  }
  const handleSearchUser = useCallback(
    (newName: string) => {
      // How can I get this taos to be displayed before I get the response back from my backend?
      // I thought that since I am setting the searchedName state after the toast it will be shown first. But it seems like that ReactJS sets the state, then TanStack Query calls my API and receive a response but up until now react-toastify has had any chance to render a notification box!
      toast('Fetching ' + newName + '...', {
        type: 'info',
        autoClose: 1000,
      });
      setSearchedName(newName);
    },
    [setSearchedName],
  );

  if (error) {
    console.error(error);
    return <h1>{error.message}</h1>;
  }

  return (
    <article className={styles.messenger}>
      <ContactList
        contacts={contacts ?? []}
        onSelect={handleSelect}
        selectedContact={to}
        onSearchUser={handleSearchUser}
      />
      <ChatBox key={to?.id} user={me} contact={to} />
    </article>
  );
}
