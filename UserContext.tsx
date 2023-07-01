import { createContext, ReactNode, useContext, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.ts";

export type NullableFirebaseUser = FirebaseUser | null;

const UserContext = createContext<NullableFirebaseUser>(null);
const UserUpdateContext = createContext<
  ((value: NullableFirebaseUser) => void) | undefined
>(undefined);

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserUpdate = () => {
  return useContext(UserUpdateContext);
};
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<NullableFirebaseUser>(auth.currentUser);

  onAuthStateChanged(auth, (user) => {
    console.log(`user onASC`, user);
    if (user !== null) {
      setUser(user);
    }
  });
  const toggleUser = (value: NullableFirebaseUser) => {
    setUser(value);
  };

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={toggleUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
