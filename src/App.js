import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, _id: Date.now().toString() }]);
  };

  const updateContact = (updatedContact) => {
    setContacts(contacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact));
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact._id !== id));
  };

  const selectContact = (id) => {
    setSelectedContact(contacts.find(contact => contact._id === id));
  };

  return (
    <div>
      <ContactForm onSubmit={addContact} />
      <ContactList contacts={contacts} onSelectContact={selectContact} onDeleteContact={deleteContact} />
      {selectedContact && (
        <ContactDetails contact={selectedContact} onUpdateContact={updateContact} />
      )}
    </div>
  );
};

export default App;
