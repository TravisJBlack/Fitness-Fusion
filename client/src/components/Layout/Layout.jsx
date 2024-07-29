import React from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {

//   return (
//     <Flex direction="column" minH="100vh" width="100%">
//       <Header />
//       <Flex flex={1} width="100%">
//         {/* <Sidebar /> */}
//         <Box flex={1} ml={{ base: 0, md: 0 }} p={4}>
//           {children}
//         </Box>
//       </Flex>

  return <>

  
  <Grid templateAreas={`"header header"
  "nav main"
  "nav footer"
  `}
  gridTemplateRows = {"100px 1fr 60px"}
  gridTemplateColumns={"150px 1fr"}
  h="200px"
  gap="0"
  >
    <GridItem pl="0"  area={"header"}>
      <Header/>
    </GridItem>
    <GridItem pl="0" area={"nav"} height={"calc(90vh)"}>
      <Sidebar/>
    </GridItem>
    <GridItem pl="2"  area={"main"}>
      {children}
    </GridItem>
    <GridItem pl="2"  area={"footer"}>

      <Footer />
    </GridItem>
  </Grid>
 
    </>;
};

export default Layout;
