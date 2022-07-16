import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    insert_clients_one(object: { name: $name, email: $email, phone: $phone }) {
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation ($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
