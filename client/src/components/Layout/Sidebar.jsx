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
      <VStack align="start">
        <Link px={2} py={1} rounded="md" _hover={{ bg: "teal.700" }} href="#">
          Home
        </Link>
        <Link px={2} py={1} rounded="md" _hover={{ bg: "teal.700" }} href="#">
          Profile
        </Link>
        <Link px={2} py={1} rounded="md" _hover={{ bg: "teal.700" }} href="#">
          Settings
        </Link>
        <Link px={2} py={1} rounded="md" _hover={{ bg: "teal.700" }} href="#">
          Logout
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
