import { Box, Button, Code, Heading, Text } from "@chakra-ui/react";
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

import { auth } from "../firebase.ts";
import { useEffect, useState } from "react";

/*
export interface User {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string;
  photoURL: string;
  localId: string;
  photoUrl: string;
}
*/

const LOCAL_STORAGE_USER_DATA_NAME = "user-data";

export default function Login() {
  const provider = new GoogleAuthProvider();

  const [userData, setUserData] = useState<FirebaseUser | undefined>(
    (JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_USER_DATA_NAME) ?? "{}"
    ) as FirebaseUser) || undefined
  );

  useEffect(() => {
    if (
      !userData ||
      !("isAnonymous" in userData || "displayName" in userData)
    ) {
      localStorage.removeItem(LOCAL_STORAGE_USER_DATA_NAME);
      return;
    }

    localStorage.setItem(
      LOCAL_STORAGE_USER_DATA_NAME,
      JSON.stringify(userData)
    );
  }, [userData]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          throw new Error("No credential");
        }
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        setUserData(user);
      })
      .catch((error) => {
        console.error(error);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signInAnonymouslyX = () => {
    console.log(`Sign in`);
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        console.log(`signed in`);
        setUserData(auth.currentUser as FirebaseUser | undefined);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ...
        console.error(error);
      });
  };

  const signOutX = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserData(undefined);
        console.log(`signed out`);
        // Sign-out successful.
      })
      .catch((error) => {
        console.error(`sign out failed`, error);
        // An error happened.
      });
  };

  return (
    <Box bg={"white"} p={4} borderRadius={10}>
      <Heading>Login</Heading>
      <Text>
        UserData:
        <Code>{JSON.stringify(userData?.displayName)}</Code>
      </Text>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      <Button onClick={signInAnonymouslyX}>Sign in anonymously</Button>
      <Button onClick={signOutX}>Sign out</Button>
    </Box>
  );
}
