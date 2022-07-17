import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
  query {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($name: String!) {
    clients(where: { name: { _eq: $name } }) {
      id
      name
      email
      phone
      projects {
        id
        name
        description
        status
      }
    }
  }
`;
