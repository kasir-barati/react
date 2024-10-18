import { useState } from 'react';
import './Messenger.component.css';
import { contacts } from '../../dummy-data/contacts.dummy-data';
import { ContactList } from './ContactList.component';
import { Contact } from '../../types/contact.type';
import { ChatBox } from './ChatBox.component';

export function Messenger() {
  const [to, setTo] = useState(contacts[0]);

  function handleSelect(contact: Contact) {
    setTo(contact);
  }

  return (
    <article className="messenger">
      <h2 className="messenger__header">Messenger app</h2>
      <form className="messenger__form">
        <ContactList
          contacts={contacts}
          onSelect={handleSelect}
          selectedContact={to}
        />
        <ChatBox key={to.email} contact={to} />
      </form>
    </article>
  );
}
