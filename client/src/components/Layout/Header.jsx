import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import source from "../../../public/images/FF logo.pdf";

// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%" h="100px" bgGradient="linear(to-t, purple.200, purple.500)" >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        <IconButton
          size="md"
          // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          icon={isOpen ? <></> : <></>}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box color="white" margin="10" fontWeight="extrabold">
          <Image
    boxSize='50px'
    objectFit='cover'
    src={source}
  />
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
            <span>|</span>
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
            <span>|</span>
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
