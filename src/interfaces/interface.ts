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
}

export interface ClientProps {
  client: IClient;
}

export interface IProps {
  project: IProject;
}
