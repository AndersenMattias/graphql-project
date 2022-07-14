import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../queries/project';
import ProjectCard from '../ProjectCard';

import '../../styles/components/_projectList.scss';

const ProjectsList = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  console.log(data);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong..</p>;

  return (
    <>
      <h3 className='projectList-header'>Projects</h3>
      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.projects.map((project: any) => {
          return <ProjectCard project={project} />;
        })}
      </section>
    </>
  );
};

export default ProjectsList;
