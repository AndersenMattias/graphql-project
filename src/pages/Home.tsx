import AddClientModal from '../components/AddClientModal';
import AddProjectModal from '../components/AddProjectModal';
import ClientList from '../components/ClientList';
import ProjectsList from '../components/ProjectsList';

import '../styles/pages/_home.scss';

const Home = () => {
  return (
    <div className='app-wrapper'>
      <div className='client-leftColumn'>
        <AddClientModal />
        <ClientList />
      </div>
      <div className='project-rightColumn'>
        <AddProjectModal />
        <ProjectsList />
      </div>
    </div>
  );
};

export default Home;
