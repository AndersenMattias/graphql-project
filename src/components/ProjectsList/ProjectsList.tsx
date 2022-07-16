import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../queries/project';
import ProjectCard from '../ProjectCard';

import '../../styles/components/_projectList.scss';
import { IProject } from '../../interfaces/interface';

const ProjectsList = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong..</p>;

  return (
    <>
      <h3 className='projectList-header'>Projects</h3>
      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.projects.map((project: IProject) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </section>
    </>
  );
};

export default ProjectsList;
