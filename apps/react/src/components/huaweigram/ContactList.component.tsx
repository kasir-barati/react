import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import { User } from '@react/common';
import debounce from 'lodash.debounce';
import { ChangeEvent, useCallback, useState } from 'react';
import styles from './ContactList.module.css';

interface ContactListProps {
  contacts: User[];
  selectedContact?: User;
  onSelect: (contact: User) => void;
  onSearchUser(name: string): void;
}

export function ContactList({
  contacts,
  onSelect,
  onSearchUser,
  selectedContact,
}: Readonly<ContactListProps>) {
  const [searchedContactName, setSearchedContactName] = useState('');
  const debouncedOnSearchUser = useCallback(
    debounce((name: string) => onSearchUser(name), 3000),
    [onSearchUser],
  );
  const listOfContacts = contacts.map((contact) => {
    const checked = selectedContact?.id === contact.id;

    return (
      <li key={contact.id} className={styles.chat}>
        <img src="/avatar.png" className={styles.chat__avatar} />
        <label htmlFor={contact.id} className={styles.chat__name}>
          {contact.name}
        </label>
        <p className={styles['chat__last-message']}>Latest message</p>
        <input
          className={styles['chat__radio-button']}
          type="radio"
          id={contact.id}
          name="contact"
          value={contact.email}
          // You cannot conditionally add checked to the input. If you do that you'll get an error in your console, read more here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable.
          // {...(someCondition && {checked: true})}

          // Another funny bug is when I was using checked={checked} ReactJS was not updating my DOM when I was choosing a new contact. But this attribute seems to work just fine.
          defaultChecked={checked}
          onChange={() => onSelect(contact)}
        />
      </li>
    );
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchedContactName(e.target.value);
    debouncedOnSearchUser(e.target.value);
  }

  return (
    <aside className={styles['left-panel']}>
      <form className={styles.search}>
        <MagnifyingGlassIcon className={styles.search__icon} />
        <input
          value={searchedContactName}
          onChange={handleChange}
          type="search"
          className={styles.search__input}
          placeholder="Search"
        />
      </form>
      <form>
        <fieldset className={styles.contacts}>
          <ul>{listOfContacts}</ul>
        </fieldset>
      </form>
    </aside>
  );
}
