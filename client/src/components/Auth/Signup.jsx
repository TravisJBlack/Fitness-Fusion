import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Signup = () => {
  return (
    <Box maxW="md" mx="auto" mt="10">
      <form>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="email" mt="4">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password" mt="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="teal" mt="4" type="submit">Sign Up</Button>
      </form>
    </Box>
  );
};

export default Signup;
