import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import Sidebar from "../Drawer/Sidebar.tsx";
import { useUser } from "../../UserContext.tsx";
import { Link } from "react-router-dom";

function TopBar() {
  const userData = useUser();
  const userIsLoggedIn = !!userData;

  return (
    <Flex bg={"blue.50"} color={"white"}>
      <Box>
        <Sidebar />
      </Box>
      <Box ml={"auto"} p={4}>
        {userIsLoggedIn ? (
          <Link to={"/auth"}>
            <Flex alignItems={"center"} gap={4} role={"group"}>
              <Text
                _groupHover={{ textDecoration: "underline" }}
                color={"black"}
              >
                {userData?.displayName ?? "ANONYM"}
              </Text>
              <Avatar
                _groupHover={{
                  outline: "solid 2px",
                  outlineColor: "blue.500",
                }}
                name={userData.displayName ?? "ANONYM"}
                src={userData.photoURL ?? ""}
                bg={"white"}
              />
            </Flex>
          </Link>
        ) : (
          <Link to={"/auth/"}>
            <Button colorScheme={"blue"}>Login</Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
}

export default TopBar;
