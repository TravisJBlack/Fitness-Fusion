import React from "react";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bgGradient="linear(to-t, purple.200, purple.500)">
      <Box margin="2" maxW="1200px" mx="auto" textAlign="center">
        <Text color="white" borderRadius="2"  fontWeight="bold" >
          &copy; {new Date().getFullYear()} FitnessFusion. All rights reserved.
        </Text>
        <ChakraLink justifyContent="left" color="white" href="#" mx={2} fontWeight="bold">
          Privacy Policy
        </ChakraLink>
        <ChakraLink color="white" href="#" mx={2} fontWeight="bold">
          Terms of Service
        </ChakraLink>
      </Box>
    </Box>
  );
};

export default Footer;
