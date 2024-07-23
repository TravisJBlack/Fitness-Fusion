import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minH="100hv">
      <Header />
      <Flex flex={1}>
        <Sidebar />
        <Box flex={1} ml={{ base: 0, md: 60 }} p={4}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
