import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import '../../styles/components/_addClientModal.scss';
import Button from '../ui/Button';
import { GET_CLIENTS } from '../../queries/client';
import { ADD_CLIENT } from '../../mutations/client';

const AddClientModal = (): JSX.Element => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  // Form state
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Error handling
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [insert_clients_one] = useMutation(ADD_CLIENT, {
    // GET current data / list
    update(cache, { data }) {
      const { clients }: any = cache.readQuery({
        query: GET_CLIENTS,
      });

      // insert new data to current list / data
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [data.insert_clients_one, ...clients],
        },
      });
    },
  });

  useEffect(() => {
    if (name.length > 0 || email.length > 0 || phone.length > 0) {
      setDisplayMessage(false);
      return;
    }
  }, [name, email, phone]);

  useEffect(() => {
    //TODO: Fix event type
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setModalIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const onToggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const onAddClient = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      setDisplayMessage(true);
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      insert_clients_one({
        variables: {
          name,
          email,
          phone,
        },
      });
      setDisplayMessage(true);
      setMessage('Client added.');
    } catch (e) {
      if (e instanceof Error) {
        throw new Error('Something went wrong.');
      }
    }

    setName('');
    setEmail('');
    setPhone('');
    setTimeout(() => {
      setDisplayMessage(false);
      setMessage('');
    }, 2000);
  };

  const Message = () => {
    return <p style={{ paddingTop: '2em', color: 'red' }}>{message}</p>;
  };

  return (
    <>
      <div className='btn-action'>
        <Button
          type='button'
          colour='btn--primary'
          onClick={() => setModalIsOpen(!isModalOpen)}
          text='Add Client'
        />
      </div>

      {isModalOpen && (
        <div className='modalWrapper-client'>
          <div className='modalContainer-client'>
            <h3 className='modalTitle-client'>Add Client</h3>

            <div className='modalContent-client'>
              <form onSubmit={onAddClient} className='form-client'>
                <label>
                  <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                  />
                  <span>Name</span>
                </label>

                <label>
                  <input
                    type='text'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                  />
                  <span>Email</span>
                </label>

                <label>
                  <input
                    type='phone'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='phone'
                  />
                  <span>Phone</span>
                </label>

                <div className='modal-btnContainer'>
                  <Button
                    id='btn-close'
                    type='button'
                    colour='btn--primary'
                    text='Close'
                    onClick={onToggleModal}
                  />
                  <Button type='submit' colour='btn--primary' text='Submit' />
                </div>
                {displayMessage && <Message />}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddClientModal;
