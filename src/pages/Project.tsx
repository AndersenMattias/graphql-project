import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ProjectDetails from '../components/ProjectDetails';
import { IProject } from '../interfaces/interface';
import { GET_PROJECT } from '../queries/project';

const Project = (): JSX.Element => {
  const { name } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { name },
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div>
      {!loading &&
        !error &&
        data.projects.map((project: IProject) => {
          return <ProjectDetails key={project.id} project={project} />;
        })}
    </div>
  );
};

export default Project;
