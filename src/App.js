import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Contact Management</h1>
      </header>
      <main>
        <Route exact path="/" component={ContactList} />
        <Route exact path="/create" component={ContactForm} />
        <Route exact path="/contact/:id" component={ContactDetails} />
        <Route exact path="/edit/:id" component={ContactForm} />
      </main>
    </div>
  );
}

export default App;
