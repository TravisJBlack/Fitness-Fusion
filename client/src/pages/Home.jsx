import React from "react";
import { VStack, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => (
  <VStack spacing={4} align="center">
    <Heading as="h2">Home</Heading>
    <Text className="text-red-500"> 
      Welcome to FitnessFusion! Click on the links below to login or sign up.
    </Text>
    <ChakraLink as={RouterLink} to="/login" color="teal.500">
      Login
    </ChakraLink>
    <ChakraLink as={RouterLink} to="/signup" color="teal.500">
      Signup
    </ChakraLink>
  </VStack>
);

export default Home;
