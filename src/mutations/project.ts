import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: projects_status_enum!
    $clientId: Int!
  ) {
    insert_projects_one(
      object: {
        name: $name
        description: $description
        status: $status
        clientId: $clientId
      }
    ) {
      id
      name
      description
      status
      clientId
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: Int!
    $name: String!
    $description: String!
    $status: projects_status_enum!
  ) {
    update_projects(
      where: { id: { _eq: $id } }
      _set: { name: $name, description: $description, status: $status }
    ) {
      returning {
        id
        name
        description
        status
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Int!) {
    delete_projects(where: { id: { _eq: $id } }) {
      returning {
        id
        name
      }
    }
  }
`;
