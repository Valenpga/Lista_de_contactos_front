import React from 'react';

const ContactList = ({ contacts, onSelectContact, onDeleteContact }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <span>{contact.fullName}</span>
            <button onClick={() => onSelectContact(contact._id)}>Ver</button>
            <button onClick={() => onDeleteContact(contact._id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;


