import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Alert } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';
import { useState } from 'react';

const Login = () => {

const [userData, setUserData] = useState({email: "", password: ""})
const [login, {error, data}] = useMutation(LOGIN_USER);

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try{
      const {data} = await login({
        variables: {...userData},
      });

      Auth.login(data.login.token);
    } catch (e){
      console.error(e)
    }
    setUserData({email: "", password: ""});

  }



  return (

    <>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
    <Box maxW="md" mx="auto" mt="10">
      <form onSubmit={handleFormSubmit}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input 
          type="email" 
          name= "email"
          value={userData.email}
          onChange={handleInputChange} />
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
        <Button colorScheme="teal" mt="4" type="submit">Login</Button>
      </form>
    </Box>
  )}

{error && (
  <Alert status='error'>
    {error.message}
  </Alert>
)}
</>
  );
};

export default Login;
