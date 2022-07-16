export interface IProject {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface IProps {
  project: IProject;
}
