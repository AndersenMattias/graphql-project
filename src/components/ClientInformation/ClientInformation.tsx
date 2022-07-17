import React, { useState } from 'react';
import { FaIdBadge, FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';

import { useMutation } from '@apollo/client';
import { UPDATE_CLIENT } from '../../mutations/client';
import { GET_CLIENT } from '../../queries/client';

import { ClientProps } from '../../interfaces/interface';

const ClientInformation = ({ client }: ClientProps) => {
  console.log(client);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);

  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const [update_clients] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENT, variables: { id: client.id } }],
  });

  const onEditClient = (e: React.FormEvent) => {
    e.preventDefault();

    update_clients({
      variables: { id: client.id, name, email, phone },
    });

    setTimeout(() => {
      setToggleEdit(false);
    }, 1000);
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

      {!toggleEdit && (
        <button onClick={() => setToggleEdit(!toggleEdit)}>
          <BsPencil />
        </button>
      )}

      {!toggleEdit && (
        <button onClick={() => setToggleEdit(!toggleEdit)}>
          <FaTrash />
        </button>
      )}

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
