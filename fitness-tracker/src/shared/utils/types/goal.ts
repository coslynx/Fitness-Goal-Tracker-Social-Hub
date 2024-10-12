import { User } from './user';

export interface Goal {
  id: number;
  userId: number;
  title: string;
  target: number;
  deadline: Date;
  progress: number;
  user: User;
}