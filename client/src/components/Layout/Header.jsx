import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box color="white" fontWeight="bold">
            Fitness Funsion
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link
              px={2}
              py={1}
              rounded="md"
              _hover={{ bg: "teal.700" }}
              href="#"
            >
              Home
            </Link>
            <Link
              px={2}
              py={1}
              rounded="md"
              _hover={{ bg: "teal.700" }}
              href="#"
            >
              About
            </Link>
            <Link
              px={2}
              py={1}
              rounded="md"
              _hover={{ bg: "teal.700" }}
              href="#"
            >
              Contact Us
            </Link>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
