import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { ClientProps } from '../../interfaces/interface';

const ClientDetails = ({ client }: ClientProps) => {
  return (
    <>
      <h5>Client Information</h5>
      <ul>
        <li>
          <FaIdBadge />
          {client.name}
        </li>
        <li>
          <FaEnvelope />
          {client.email}
        </li>
        <li>
          <FaPhone />
          {client.phone}
        </li>
      </ul>
    </>
  );
};

export default ClientDetails;
