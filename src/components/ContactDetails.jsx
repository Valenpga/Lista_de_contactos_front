import React, { useState, useEffect } from 'react';

const ContactDetails = ({ contact, onUpdateContact }) => {
  const [editedContact, setEditedContact] = useState({ ...contact });

  useEffect(() => {
    setEditedContact({ ...contact });
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleUpdate = () => {
    onUpdateContact(editedContact);
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Detalles del Contacto</h2>
      <p>Nombre Completo: {contact.fullName}</p>
      <p>Numero de Telefono: {contact.phoneNumber}</p>
      <p>Email: {contact.email}</p>
      <h3>Editar Contacto</h3>
      <form>
        <input
          type="text"
          name="fullName"
          value={editedContact.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={editedContact.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={editedContact.email}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleUpdate}>
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default ContactDetails;
