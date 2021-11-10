import 'next-auth';

declare module 'next-auth' {
  export interface User {
    id: string;
    email?: string;
    roles: string[];
  }
  export interface Session {
    user: User;
  }
}
