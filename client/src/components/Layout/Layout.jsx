import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
// import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" width="100%">
      <Header />
      <Flex flex={1} width="100%">
        {/* <Sidebar /> */}
        <Box flex={1} ml={{ base: 0, md: 0 }} p={4}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
