import { Avatar, Box, Flex } from "@chakra-ui/react";
import Sidebar from "../Drawer/Sidebar.tsx";

function TopBar() {
  return (
    <Flex bg={"blue.50"} color={"white"}>
      <Box>
        <Sidebar />
      </Box>
      <Box ml={"auto"} p={4}>
        <Avatar
          name="Aleksej Wesselbaum"
          src="https://lh3.googleusercontent.com/a/AAcHTteEYDJgtXEoZTR9wMGeJOUTg2k54sKSiAUW6lwWhPa-ySs=s96-c"
          bg={"white"}
        />
      </Box>
    </Flex>
  );
}

export default TopBar;
