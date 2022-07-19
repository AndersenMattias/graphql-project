export interface IProject {
  id: number;
  name: string;
  description: string;
  status: string;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  projects?: {
    id: number;
    name: string;
    description: string;
    status: string;
    clientId: number;
  }[];
}

export interface ClientProps {
  client: IClient;
  projects?: any;
}

export interface IProjects {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface IProps {
  project: IProject;
}

export interface IProjectsProps {
  id: number;
  name: string;
  description: string;
  status: string;
  clientId: number;
}
