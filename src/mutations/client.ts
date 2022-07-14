import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation ($name: String!, $email: String, $phone: String!) {
    createClient(name: $name, email: $email, phone: $phone) {
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
