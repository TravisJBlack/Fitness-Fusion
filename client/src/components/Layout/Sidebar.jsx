import React from "react";
import { Box, VStack, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      bg="teal.500"
      color="white"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      p={4}
    >
      <Text fontSize="2xl" mb={4}>
        Dashboard
      </Text>
      <VStack align="start">
        <ChakraLink
          as={RouterLink}
          to="/"
          px={2}
          py={1}
          rounded="md"
          _hover={{ bg: "teal.700" }}
        >
          Home
        </ChakraLink>
        <ChakraLink
          as={RouterLink}
          to="/profile"
          px={2}
          py={1}
          rounded="md"
          _hover={{ bg: "teal.700" }}
        >
          Profile
        </ChakraLink>
        <ChakraLink
          as={RouterLink}
          to="/settings"
          px={2}
          py={1}
          rounded="md"
          _hover={{ bg: "teal.700" }}
        >
          Settings
        </ChakraLink>
        <ChakraLink
          as={RouterLink}
          to="/logout"
          px={2}
          py={1}
          rounded="md"
          _hover={{ bg: "teal.700" }}
        >
          Logout
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
