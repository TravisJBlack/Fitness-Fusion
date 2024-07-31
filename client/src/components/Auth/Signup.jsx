import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Alert,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    age: null,
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let newUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      age: Number(userData.age),
    };

    try {
      const { data } = await addUser({
        variables: { ...newUser },
      });
      //console.log(typeof userData.age);

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setUserData({
      username: "",
      email: "",
      password: "",
      age: null,
    });
  };

  return (
    <>
      {data ? (
        <p>
          Success! You may now head{" "}
          <ChakraLink as={Link} to="/">
            back to the homepage.
          </ChakraLink>
        </p>
      ) : (
        <Box maxW="md" mx="auto" mt="10">
          <form onSubmit={handleFormSubmit}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="email" mt="4">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password" mt="4">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="age" mt="4">
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button colorScheme="teal" mt="4" type="submit">
              Sign Up
            </Button>
          </form>
        </Box>
      )}

      {error && <Alert status="error">{error.message}</Alert>}
    </>
  );
};

export default Signup;
