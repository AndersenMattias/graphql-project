import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import ClientDetails from '../ClientDetails';
import Button from '../ui/Button';
import { GET_PROJECT, GET_PROJECTS } from '../../queries/project';
import { GET_CLIENTS } from '../../queries/client';
import { DELETE_PROJECT, UPDATE_PROJECT } from '../../mutations/project';
import { IProps } from '../../interfaces/interface';

import '../../styles/components/_projectDetails.scss';
import { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import DeleteModal from '../DeleteModal';

const ProjectDetails = ({ project }: IProps): JSX.Element => {
  const navigate = useNavigate();

  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const [name, setName] = useState<string>(project.name);
  const [description, setDescription] = useState<string>(project.description);
  const [status, setStatus] = useState(project.status);

  const [update_projects] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  // Delete client then refetch Data
  const [delete_projects] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  const onEditProject = (e: React.FormEvent) => {
    e.preventDefault();

    update_projects({
      variables: { id: project.id, name, description, status },
    });
  };

  return (
    <>
      <div style={{ paddingBottom: '2em' }}>
        <Link to='/'>
          <Button colour='btn--primary' text='Go back' />
        </Link>
      </div>

      <div className='clientInfo-wrapper'>
        <div className='clientInfo-leftColumn'>
          <h3>Project Information</h3>
          <ul key={project.id}>
            <li>{project.name}</li>
            <li>
              <p>{project.description}</p>
            </li>
            <li>{project.status.replace('_', ' ')}</li>
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
            <div key={project.id}>
              <h3>Update Project</h3>
              <form onSubmit={onEditProject}>
                <label>Name</label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>
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
          name={project.name}
        />
      </div>
    </>
  );
};

export default ProjectDetails;
