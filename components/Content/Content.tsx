import { Outlet } from "react-router-dom";
// import contentStyles from "./Content.module.css";
import { Container } from "@chakra-ui/react";

function Detail() {
  return (
    <Container p={4}>
      <Outlet />
    </Container>
  );
}

export default Detail;
