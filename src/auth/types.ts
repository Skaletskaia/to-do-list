import { User } from "firebase/auth";

export interface TAuthContext {
  isAuthenticated: boolean;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: User | null;
  createUser: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}
