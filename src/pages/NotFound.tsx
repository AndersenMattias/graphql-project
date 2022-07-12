import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <p>This page doesn't exist. </p>
      <button>
        <Link to='/'>Go Back</Link>
      </button>
    </div>
  );
};

export default NotFound;
