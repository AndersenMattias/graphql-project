import AddProjectModal from '../components/AddProjectModal';
import ClientList from '../components/ClientList';
import ProjectsList from '../components/ProjectsList';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div>
        <ClientList />
      </div>
      <div>
        <AddProjectModal />
        <ProjectsList />
      </div>
    </div>
  );
};

export default Home;
