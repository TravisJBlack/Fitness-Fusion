import React from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Login = () => {
  return (
    <Box maxW="md" mx="auto" mt="10">
      <form>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password" mt="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="teal" mt="4" type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
