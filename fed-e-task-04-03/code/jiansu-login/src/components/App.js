import { Box } from "@chakra-ui/core";
import React from "react";
import Form from "./Form";

function App() {
  return (
    <Box w="100vw" h="100vh" backgroundColor="#f1f1f1">
      <Box mx="auto" pt="100px" d="flex" justifyContent="center">
        <Form />
      </Box>
    </Box>
  );
}

export default App;
