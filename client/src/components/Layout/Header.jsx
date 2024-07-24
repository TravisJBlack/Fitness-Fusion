import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="teal.500" px={4} w="100%">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight="bold">
            FitnessFusion
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
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
              to="/login"
              px={2}
              py={1}
              rounded="md"
              _hover={{ bg: "teal.700" }}
            >
              Login
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/signup"
              px={2}
              py={1}
              rounded="md"
              _hover={{ bg: "teal.700" }}
            >
              Signup
            </ChakraLink>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
