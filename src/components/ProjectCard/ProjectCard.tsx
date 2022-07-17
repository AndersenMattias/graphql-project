import { useMutation, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { IProps } from '../../interfaces/interface';
import { DELETE_PROJECT } from '../../mutations/project';
import { GET_PROJECTS } from '../../queries/project';

import '../../styles/components/_projectCard.scss';
import Button from '../ui/Button';

const ProjectCard = ({ project }: IProps): JSX.Element => {
  return (
    <div className='card'>
      <div className='card-image'></div>
      <p>Project: {project.name}</p>
      <p>Client: {project.client.name}</p>

      <Link className='card-link' to={`/project/${project.name}`}>
        <Button type='button' colour='btn--primary' text='View' />
      </Link>
    </div>
  );
};

export default ProjectCard;
