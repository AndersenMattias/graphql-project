import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CLIENT } from '../queries/client';
import ClientInformation from '../components/ClientInformation';
import { IClient } from '../interfaces/interface';

const Client = () => {
  const { name } = useParams();
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { name },
  });
  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong.</p>;
  return (
    <div style={{ width: '60%', margin: '0 auto', paddingTop: '5em' }}>
      {data.clients.map((client: IClient) => {
        return (
          <ClientInformation
            key={client.id}
            client={client}
            projects={client.projects}
          />
        );
      })}
    </div>
  );
};

export default Client;
