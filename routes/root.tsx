import Content from "../components/Content/Content.tsx";
import Sidebar from "../components/Drawer/Sidebar.tsx";
import { Box, Grid } from "@chakra-ui/react";

export default function Root() {
  return (
    <>
      <Box
        bg={"gray.50"}
        minHeight={"100dvh"}
        sx={{ scrollbarGutter: "stable" }}
      >
        <Grid gridTemplateColumns={{ base: "1fr", md: "200px 1fr" }}>
          <Sidebar />
          <Content />
        </Grid>
      </Box>
    </>
  );
}
