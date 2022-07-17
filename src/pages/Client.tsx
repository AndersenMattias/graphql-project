import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ClientDetails from '../components/ClientDetails/ClientDetails';
import { GET_CLIENT } from '../queries/client';
import ClientInformation from '../components/ClientInformation';

const Client = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { name },
  });
  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong.</p>;
  return (
    <div>
      {data.clients.map((client: any) => {
        return <ClientInformation client={client} />;
      })}
    </div>
  );
};

export default Client;
