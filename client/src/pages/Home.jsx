import React from "react";
import { Stack, VStack,  CardBody, CardFooter, Button, Heading, Text, Card, Image as ChakraLink, Img } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_CLASS } from '../utils/queries'
import { useMutation } from "@apollo/client";
import { ADDCLASSTOUSER } from '../utils/mutations'


const Home = () => {

  const { loading, data } = useQuery(QUERY_CLASS);
  const [addClassToUser, {error, data2}] = useMutation(ADDCLASSTOUSER)


  const classes = data?.class || [];


  const handleClick = async (event, _id) => {
    event.preventDefault();
    try{
      const { data2 } = await addClassToUser({
        variables: ({id: _id})
      })

      if(error){
        throw new Error('something went wrong!')
      }
        alert('This class has been added to your membership!')
    }catch(e){
      console.error(e);
    }
  }

  if (loading) {
    return "Loading...."
  }
  return (
    <>
      <VStack spacing={4} align="center">
        <Heading as="h2">Home</Heading>
        <Text>
          Welcome to FitnessFusion were your fitness dreams become reality!!!

        </Text>

        {classes.map((course, index) => {
          return (

            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              key={index}
              w="100%"
            >

              <Img
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={course.image}
                alt='Caffe Latte'
              />

              <Stack>
                <CardBody>
                  <Heading size='md'>{course.name}</Heading>

                  <Text py='2'>
                    {course.description}
                  </Text>
                  {Auth.loggedIn() ?
                    <>
                      <Text py='2'>
                        {course.schedule}
                      </Text>
                      <Text py='2'>
                        ${course.price}.00
                      </Text>
                    </> :
                    null}
                </CardBody>
                <CardFooter>
                  {Auth.loggedIn() ?
                    <Button variant='solid' colorScheme='blue' onClick={() => handleClick(event, course._id)}>
                      Add class to membership
                    </Button> :
                    <Link to='/login'>
                      <Button variant='solid' colorScheme='blue'>
                        Login for more details!
                      </Button>
                    </Link>
                  }
                </CardFooter>
              </Stack>
            </Card>


          )
        })}

      </VStack>
    </>
  );
};

export default Home;
