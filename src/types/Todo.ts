export enum TodoStatus {
  OPEN = "OPEN",
  DONE = "DONE",
}

export type Todo = {
  id?: string;
  title: string;
  description: string;
  status?: TodoStatus;
};
