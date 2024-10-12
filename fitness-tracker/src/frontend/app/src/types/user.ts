import { Goal } from './goal';
import { Post } from './post';

export interface User {
  id: number;
  email: string;
  name: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  goals?: Goal[];
  posts?: Post[];
}