import React from "react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Link as ChakraLink,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Auth from "../../utils/auth";
import source from "../../../public/images/unnamed.jpg";
import { LuDumbbell } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%" minH={100} maxH={'auto'} bgGradient="linear(to-t, purple.200, purple.500)">
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <IconButton
          size="md"
          border='0px'
          bg={'purple.250'}
          _hover={{
            background: "purple.250",
            color: "white",
            border: 'none',
          }}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          icon={isOpen ? <IoMdCloseCircleOutline size={35} /> : <LuDumbbell size={35} />}
        />
        <HStack spacing={8} alignItems="center">
          <Box color="white" margin="10" fontWeight="extrabold">
            <Image
              marginTop="10"
              boxSize="50px"
              objectFit="cover"
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
              _hover={{
                bg: "pink.700",
                textColor: "white",
                fontWeight: "bold",
              }}
            >
              Home
            </ChakraLink>
            <span>|</span>
            {Auth.loggedIn() ? (
              <>
                <ChakraLink
                  as={RouterLink}
                  to="/profile"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Profile
                </ChakraLink>
                <span>|</span>

                <ChakraLink
                  as={RouterLink}
                  to="/workout"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Workout
                </ChakraLink>
                <span>|</span>

                <ChakraLink
                  as={RouterLink}
                  to="/"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                  onClick={Auth.logout}
                >
                  Logout
                </ChakraLink>
              </>
            ) : (
              <>
                <ChakraLink
                  as={RouterLink}
                  to="/login"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

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
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Signup
                </ChakraLink>
              </>
            )}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Flex >
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} bg={"transparent"} spacing={4} zIndex={99}>
              <ChakraLink
                as={RouterLink}
                to="/"
                px={2}
                py={1}
                rounded="md"
                onClick={onClose}
                _hover={{
                  bg: "pink.700",
                  textColor: "white",
                  fontWeight: "bold",
                }}
              >
                Home
              </ChakraLink>

              {Auth.loggedIn() ? (
                <>
                  <ChakraLink
                    as={RouterLink}
                    to="/profile"
                    px={2}
                    py={1}
                    rounded="md"
                    onClick={onClose}
                    _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                  >
                    Profile
                  </ChakraLink>

                  <ChakraLink
                    as={RouterLink}
                    to="/workout"
                    px={2}
                    py={1}
                    rounded="md"
                    onClick={onClose}
                    _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                  >
                    Workout
                  </ChakraLink>

                  <ChakraLink
                    as={RouterLink}
                    to="/"
                    px={2}
                    py={1}
                    rounded="md"
                    _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                    onClick={Auth.logout}
                  >
                    Logout
                  </ChakraLink>
                </>
              ) : (
                <>
                  <ChakraLink
                    as={RouterLink}
                    to="/login"
                    px={2}
                    py={1}
                    rounded="md"
                    onClick={onClose}
                    _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                  >
                    Login
                  </ChakraLink>

                  <ChakraLink
                    as={RouterLink}
                    to="/signup"
                    px={2}
                    py={1}
                    rounded="md"
                    onClick={onClose}
                    _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                  >
                    Signup
                  </ChakraLink>
                </>
              )}
            </Stack>

          </Box>
        </Flex>
      ) : null}
    </Box>
  );
};

export default Header;
