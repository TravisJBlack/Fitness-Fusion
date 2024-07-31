import React from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Flex direction="column" minH="100vh" width="100%">
        <Header />
        <Flex flex={1} width="100%">
          <Box flex={1} ml={{ base: 0, md: 0 }} p={4}>
            {children}
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};

export default Layout;
