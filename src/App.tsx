import { Route, Routes } from 'react-router-dom';

import './styles/abstracts/_base.scss';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Project from './pages/Project';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project/:name' element={<Project />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
