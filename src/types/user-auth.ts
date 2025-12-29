import { User } from './user';

export type UserAuth = User & {
  email: string;
  token: string;
};