import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      description
      status
      clientId
      client {
        email
        name
        phone
        id
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($name: String!) {
    projects(where: { name: { _eq: $name } }) {
      id
      name
      description
      status
      clientId
      client {
        email
        name
        phone
        id
      }
    }
  }
`;
