import { Status } from './Status';

export interface Board {
  id: string;
  title: string;
  statuses: Status[];
}
