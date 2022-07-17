import React, { useState } from 'react';
import { FaIdBadge, FaEnvelope, FaPhone } from 'react-icons/fa';

const ClientInformation = ({ client }: any) => {
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const onEditClient = (e: React.FormEvent) => {
    e.preventDefault();

    // addClient(name, email, phone);

    console.log('name: ', name, 'email: ', email, 'phone: ', phone);
  };

  return (
    <>
      <h5>Client Information</h5>
      {!toggleEdit && (
        <ul key={client.id}>
          <li>
            <FaIdBadge />
            {client.name}
          </li>
          <li>
            <FaEnvelope />
            {client.email}
          </li>
          <li>
            <FaPhone />
            {client.phone}
          </li>
        </ul>
      )}
      <button onClick={() => setToggleEdit(!toggleEdit)}>Edit</button>

      {toggleEdit && (
        <div key={client.id}>
          <form onSubmit={onEditClient}>
            <label>Name</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type='text'
              id='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div>
              <button
                className='btn btn-cancelUserModal'
                onClick={() => setToggleEdit(!toggleEdit)}
              >
                Cancel
              </button>
              <button type='submit' className='btn btn-saveUser'>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ClientInformation;
