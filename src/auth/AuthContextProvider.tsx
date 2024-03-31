import React, {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  Auth,
  User,
} from "firebase/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  user?: User | null;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loginWithEmailAndPassword: async () =>
    Promise.reject("Function not implemented."),
  createUser: async () => Promise.reject("Function not implemented."),
  logOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
  firebaseApp,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const auth: Auth = getAuth(firebaseApp);

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence).then(() => {
      auth.languageCode = "ru";
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      });
    });
  }, [auth]);

  const createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginWithEmailAndPassword,
        createUser,
        user,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
