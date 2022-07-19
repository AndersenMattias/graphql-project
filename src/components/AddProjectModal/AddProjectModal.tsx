import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import '../../styles/components/_addProjectModal.scss';
import Button from '../ui/Button';
import { GET_CLIENTS } from '../../queries/client';
import { ADD_PROJECT } from '../../mutations/project';
import { GET_PROJECTS } from '../../queries/project';
import { IClient } from '../../interfaces/interface';

const AddProjectModal = (): JSX.Element => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  // Form state
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [clientId, setClientId] = useState<string>('');
  const [status, setStatus] = useState('Not_Started');

  // Error handling
  const [displayErr, setDisplayErr] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>('');

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [insert_projects_one] = useMutation(ADD_PROJECT, {
    // GET current data / list
    update(cache, { data }) {
      const { projects }: any = cache.readQuery({
        query: GET_PROJECTS,
      });

      // insert new data to current list / data
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [data.insert_projects_one, ...projects],
        },
      });
    },
  });

  useEffect(() => {
    if (name.length > 0 || description.length > 0 || status.length > 0) {
      setDisplayErr(false);
      return;
    }
  }, [name, description, status]);

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

  const onAddProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      setDisplayErr(true);
      setErrMessage('Please fill in all fields.');
      return;
    }

    insert_projects_one({
      variables: {
        name,
        description,
        clientId,
        status,
      },
    });

    setName('');
    setDescription('');
    setStatus('Not_Started');
    setClientId('');
  };

  if (loading) return null!;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {data.clients.length > 0 && (
        <div className='btn-action'>
          <div>
            <Button
              type='button'
              colour='btn--primary'
              onClick={() => setModalIsOpen(!isModalOpen)}
              text='New Project'
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className='modalWrapper-project'>
          <div className='modalContainer-project'>
            <h3 className='modalTitle-project'>New Project</h3>

            <div className='modalContent-project'>
              <form onSubmit={onAddProject} className='form-project'>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                />
                <textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Description..'
                ></textarea>
                <label>Status</label>
                <select
                  id='status'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value='Not_Started'>Not started</option>
                  <option value='In_Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                </select>

                <label>Client</label>
                <select
                  id='clientId'
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                >
                  <option value=''>Select Client</option>
                  {data.clients.map(({ id, name }: IClient) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>

                <div className='modal-btnContainer-project'>
                  <Button
                    id='btn-close'
                    type='button'
                    colour='btn--primary'
                    text='Close'
                    onClick={onToggleModal}
                  />
                  <Button type='submit' colour='btn--primary' text='Submit' />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
