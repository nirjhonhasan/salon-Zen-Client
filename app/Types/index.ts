

export interface UserSession {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string | null;
    role?: string;
  } | null;
}