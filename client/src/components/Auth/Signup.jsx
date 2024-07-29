import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      localStorage.setItem("id_token", data.addUser.token);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10">
      <form onSubmit={handleFormSubmit}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" mt="4">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" mt="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="age" mt="4">
          <FormLabel>Age</FormLabel>
          <Input
            type="number"
            name="age"
            value={formState.age}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="teal" mt="4" type="submit">
          Sign Up
        </Button>
      </form>
      {error && <div>Sign up failed</div>}
    </Box>
  );
};

export default Signup;
