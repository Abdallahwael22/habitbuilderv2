
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface AuthUser extends User {
}
