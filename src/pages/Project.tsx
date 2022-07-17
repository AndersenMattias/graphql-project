import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import ClientDetails from '../components/ClientDetails';
import Button from '../components/ui/Button';
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
        data.projects.map((project: any) => {
          return (
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
          );
        })}
    </div>
  );
};

export default Project;
