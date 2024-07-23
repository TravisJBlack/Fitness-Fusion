import React from "react";
import { Box, VStack, Link, Text } from "@chakra-ui/react";

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
    </Box>
  );
};
