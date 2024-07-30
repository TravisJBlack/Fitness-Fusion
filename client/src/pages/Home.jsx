import React from "react";
import {
  Stack, VStack, CardBody, CardFooter, Popover, PopoverTrigger, PopoverContent,
  PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, Button, Heading, Text, Card, Img
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CLASS } from '../utils/queries';
import { ADDCLASSTOUSER } from '../utils/mutations';

const Home = () => {
  const { loading: classLoading, error: classError, data: classData } = useQuery(QUERY_CLASS);
  const [addClassToUser, { error: mutationError }] = useMutation(ADDCLASSTOUSER);

  if (classLoading) {
    return <Text>Loading....</Text>;
  }

  if (classError) {
    return <Text>Error loading classes: {classError.message}</Text>;
  }

  const classes = classData?.class || [];

  const handleClick = async (event, _id) => {
    event.preventDefault();

    try {
      await addClassToUser({ variables: { id: _id } });

      if (mutationError) {
        throw new Error('Something went wrong!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <VStack spacing={4} align="center">
        <Heading as="h2" bgGradient="linear(to-t, purple.200, purple.500)" p={6} boxShadow="dark-lg">
          FitnessFusion
        </Heading>
        <Text>Welcome to FitnessFusion where your fitness dreams become reality!!!</Text>

        <Link to="/checkout">
          <Button bgGradient="linear(to-r, purple.300, purple.500)" color="white">
            Purchase Membership
          </Button>
        </Link>

        {classes.map((course, index) => (
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
            key={course._id}
            w="100%"
            m="2"
            bgGradient={index % 2 === 0 ? "linear(to-t, purple.100, purple.500)" : "linear(to-t, purple.500, purple.100)"}
            boxShadow={index % 2 === 0 ? "5px 5px 5px 5px #B19CD9" : "5px 5px 5px 5px #9a7ece"}
          >
            <Img
              objectFit="cover"
              maxW={{ base: '100%', sm: '200px' }}
              src={course.image}
              alt={course.name}
            />
            <Stack>
              <CardBody>
                <Heading size="md">{course.name}</Heading>
                <Text py="2">{course.description}</Text>
                {Auth.loggedIn() && (
                  <>
                    <Text py="2">{course.schedule}</Text>
                    <Text py="2">${course.price}.00</Text>
                  </>
                )}
              </CardBody>
              <CardFooter>
                {Auth.loggedIn() ? (
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="solid"
                        bgGradient={index % 2 === 0 ? "linear(to-t, purple.100, purple.500)" : "linear(to-t, purple.500, purple.100)"}
                        onClick={(event) => handleClick(event, course._id)}
                      >
                        Add class to membership
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>Class has been added to your account!</PopoverBody>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link to="/login">
                    <Button
                      bgGradient={index % 2 === 0 ? "linear(to-t, purple.300, purple.600)" : "linear(to-t, purple.300, purple.100)"}
                      _hover={{ color: 'white' }}
                    >
                      Login for more details!
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </VStack>
    </>
  );
};

export default Home;
