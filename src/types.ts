export interface IList {
  id: string;
  task: string;
  done: boolean;
  date: {
    nanoseconds: number;
    seconds: number;
  };
}
