import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { ClientProps } from '../../interfaces/interface';

const ClientDetails = ({ client }: ClientProps): JSX.Element => {
  return (
    <>
      <h5>Client Information</h5>
      <ul>
        <li>
          <FaIdBadge style={{ color: 'orange' }} className='icon' />

          {client.name}
        </li>
        <li>
          <FaEnvelope style={{ color: 'lightblue' }} className='icon' />

          {client.email}
        </li>
        <li>
          <FaPhone style={{ color: 'green' }} className='icon' />

          {client.phone}
        </li>
      </ul>
    </>
  );
};

export default ClientDetails;
