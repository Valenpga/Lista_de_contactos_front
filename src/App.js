
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('http://localhost:3001/contacts')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  };

  const addContact = (contact) => {
    fetch('http://localhost:3001/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
      .then(response => response.json())
      .then(newContact => {
        setContacts([...contacts, newContact]);
        window.location.href = '/';
      })
      .catch(error => console.error('Error creating contact:', error));
  };

  const updateContact = (updatedContact) => {
    fetch(`http://localhost:3001/contact/:id${updatedContact._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContact),
    })
      .then(response => response.json())
      .then(newContact => {
        setContacts(contacts.map(contact => contact._id === newContact._id ? newContact : contact));
        setSelectedContact(null);
      })
      .catch(error => console.error('Error updating contact:', error));
  };

  const deleteContact = (id) => {
    fetch(`http://localhost:3001/contact/:id${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setContacts(contacts.filter(contact => contact._id !== id));
        setSelectedContact(null);
      })
      .catch(error => console.error('Error deleting contact:', error));
  };

  const selectContact = (id) => {
    const contact = contacts.find(contact => contact._id === id);
    setSelectedContact(contact);
  };

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1>Contact Manager</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add">Add Contact</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route exact path="/">
            <React.Fragment>
              <ContactList contacts={contacts} onSelectContact={selectContact} onDeleteContact={deleteContact} />
              {selectedContact && (
                <ContactDetails contact={selectedContact} onUpdateContact={updateContact} />
              )}
            </React.Fragment>
          </Route>

          <Route path="/add">
            <React.Fragment>
              <ContactForm onSubmit={addContact} />
            </React.Fragment>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
