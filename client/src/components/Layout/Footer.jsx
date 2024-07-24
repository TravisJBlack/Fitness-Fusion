import React from "react";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" py={4} w="100%">
      <Box maxW="1200px" mx="auto" textAlign="center">
        <Text>
          &copy; {new Date().getFullYear()} FitnessFusion. All rights reserved.
        </Text>
        <ChakraLink href="#" mx={2}>
          Privacy Policy
        </ChakraLink>
        <ChakraLink href="#" mx={2}>
          Terms of Service
        </ChakraLink>
      </Box>
    </Box>
  );
};

export default Footer;
