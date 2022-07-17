import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CLIENTS } from '../../queries/client';

import '../../styles/components/_clientList.scss';
import Button from '../ui/Button';

const ClientList = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong..</p>;

  return (
    <>
      <h3 className='clientList-header'>Clients</h3>
      <div className='clientList-wrapper'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client: any) => {
              return (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                    <Link to={`/client/${client.name}`}>
                      <Button colour='btn--primary' text='View' />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientList;
