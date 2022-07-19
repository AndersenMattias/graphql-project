import { Link } from 'react-router-dom';

import '../../styles/components/_header.scss';

const Header = (): JSX.Element => {
  return (
    <nav>
      <div className='nav-container'>
        <Link to='/'>
          <div>
            <img
              className='navImg'
              src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt=''
            />
          </div>
        </Link>
        <div className='nav-header'>
          <h2>Client overview</h2>
        </div>
      </div>
    </nav>
  );
};

export default Header;
