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
  const {
    error,
    isLoading,
    data: contacts,
  } = useQuery({
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
      setSearchedName(newName);
    },
    [setSearchedName],
  );

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    toast('loading');
    // show  maybe...
  }

  return (
    <article className={styles.messenger}>
      <ContactList
        contacts={contacts ?? []}
        onSelect={handleSelect}
        selectedContact={to}
        onSearchUser={handleSearchUser}
      />
      <ChatBox key={to?.email} user={me} contact={to} />
    </article>
  );
}
