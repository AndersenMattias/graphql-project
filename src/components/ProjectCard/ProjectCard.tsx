import { Link } from 'react-router-dom';

import '../../styles/components/_projectCard.scss';
import Button from '../ui/Button';

const ProjectCard = ({ project }: any) => {
  console.log(project);
  return (
    <div className='card'>
      <div className='card-image'></div>
      <h4>{project.name}</h4>
      <p>{project.description}</p>
      <Link className='card-link' to='/'>
        <Button type='button' colour='btn--primary' text='View' />
      </Link>
    </div>
  );
};

export default ProjectCard;
