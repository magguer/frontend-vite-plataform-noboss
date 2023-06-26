export interface Application {
  _id: string;
  project: string;
  user: { username: string };
  status: boolean;
  map: Function;
}

export interface ApplicationType {
  application: Application;
}
