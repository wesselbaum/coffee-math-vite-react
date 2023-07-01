import { Box, Button, Flex } from "@chakra-ui/react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase.ts";
import { useUser, useUserUpdate } from "../UserContext.tsx";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const updateUser = useUserUpdate();
  const userData = useUser();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error(error);
    });
  };

  const signOut = () => {
    const auth = getAuth();
    firebaseSignOut(auth)
      .then(() => {
        if (updateUser) {
          updateUser(null);
        }
      })
      .catch((error) => {
        console.error(`sign out failed`, error);
      });
  };

  return (
    <Box bg={"white"} p={4} borderRadius={10}>
      <Flex gap={4} justifyContent={"flex-end"}>
        {userData ? (
          <Button colorScheme={"gray"} onClick={signOut}>
            Sign out
          </Button>
        ) : (
          <Button colorScheme={"blue"} pl={0} onClick={signInWithGoogle}>
            <Box
              bg={"white"}
              p={2}
              mr={2}
              borderRadius={4}
              borderWidth={2}
              borderColor={"blue.500"}
            >
              <FcGoogle size={20} />
            </Box>
            Sign in with Google
          </Button>
        )}
      </Flex>
    </Box>
  );
}
