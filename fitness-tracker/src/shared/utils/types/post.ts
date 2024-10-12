import { User } from './user';

export interface Post {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  likes: number;
  comments: number;
  user: User;
}