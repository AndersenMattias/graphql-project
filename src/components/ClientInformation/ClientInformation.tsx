import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaIdBadge, FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';

import { useMutation } from '@apollo/client';
import { DELETE_CLIENT, UPDATE_CLIENT } from '../../mutations/client';
import { GET_CLIENT, GET_CLIENTS } from '../../queries/client';

import { ClientProps, IProjectsProps } from '../../interfaces/interface';
import { GET_PROJECTS } from '../../queries/project';

import '../../styles/components/_clientInformation.scss';
import Button from '../ui/Button';
import DeleteModal from '../DeleteModal';

const ClientInformation = ({ client, projects }: ClientProps): JSX.Element => {
  const navigate = useNavigate();

  const clientId = projects.map((x: IProjectsProps) => x.clientId)!;

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);

  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const [update_clients] = useMutation(UPDATE_CLIENT, {
    refetchQueries: [{ query: GET_CLIENT, variables: { id: client.id } }],
  });

  // Delete client then refetch Data
  const [delete_clients, { data, loading, error }] = useMutation(
    DELETE_CLIENT,
    {
      variables: { clientId: clientId[0], id: client.id },

      onCompleted: () => navigate('/'),
      refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    }
  );

  const onEditClient = (e: React.FormEvent) => {
    e.preventDefault();

    update_clients({
      variables: { id: client.id, name, email, phone },
    });
  };

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      <div style={{ paddingBottom: '2em' }}>
        <Link to='/'>
          <Button colour='btn--primary' text='Go back' />
        </Link>
      </div>

      <div className='clientInfo-wrapper'>
        <div className='clientInfo-leftColumn'>
          <h3>Client Information</h3>
          <ul key={client.id}>
            <li>
              <FaIdBadge style={{ color: 'orange' }} className='icon' />
              {client.name}
            </li>
            <li>
              <FaEnvelope style={{ color: 'lightblue' }} className='icon' />
              {client.email}
            </li>
            <li>
              <FaPhone style={{ color: 'green' }} className='icon' />
              {client.phone}
            </li>
            <li></li>
          </ul>
          <div>
            {!toggleEdit && (
              <Button
                id='edit-clientIcon'
                colour='btn--icon'
                onClick={() => setToggleEdit(!toggleEdit)}
              >
                <BsPencil />
              </Button>
            )}

            {!toggleEdit && (
              <Button
                id='delete-clientIcon'
                colour='btn--icon'
                onClick={() => setToggleModal(!toggleModal)}
              >
                <FaTrash />
              </Button>
            )}
          </div>
        </div>

        <div className='clientInfo-rightColumn'>
          {toggleEdit && (
            <div key={client.id}>
              <h3>Update Client</h3>
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
                <div className='editForm-actionBtns'>
                  <Button
                    colour='btn--cancel'
                    id='btn btn-cancelUserModal'
                    onClick={() => setToggleEdit(!toggleEdit)}
                    text='Cancel'
                  />

                  <Button colour='btn--primary' type='submit' text='Save' />
                </div>
              </form>
            </div>
          )}
        </div>
        <DeleteModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          name={client.name}
        />
      </div>
    </>
  );
};

export default ClientInformation;
