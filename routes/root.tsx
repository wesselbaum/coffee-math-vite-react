import Content from "../components/Content/Content.tsx";
import { Box } from "@chakra-ui/react";
import TopBar from "../components/TopBar/TopBar.tsx";

export default function Root() {
  return (
    <>
      <Box
        bg={"gray.50"}
        minHeight={"100dvh"}
        sx={{ scrollbarGutter: "stable" }}
      >
        <TopBar />
        <Content />
      </Box>
    </>
  );
}
