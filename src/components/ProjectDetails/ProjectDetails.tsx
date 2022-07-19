import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import ClientDetails from '../ClientDetails';
import Button from '../ui/Button';
import { GET_PROJECTS } from '../../queries/project';
import { GET_CLIENTS } from '../../queries/client';
import { DELETE_PROJECT } from '../../mutations/project';

const ProjectDetails = ({ project, clients, data }: any) => {
  const navigate = useNavigate();

  // Delete client then refetch Data
  const [delete_projects] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <>
      <div key={project.id}>
        <Link to='/'>
          <Button colour='btn--primary' text='Back' />
        </Link>
        <h2>{project.name}</h2>
        <p>{project.description}</p>

        <h5>Project Status</h5>
        <p>{project.status}</p>
        <ClientDetails key={project.client.id} client={project.client} />
      </div>
      <Button
        type='button'
        colour='btn--primary'
        text='Delete'
        onClick={() => delete_projects()}
      />
    </>
  );
};

export default ProjectDetails;
