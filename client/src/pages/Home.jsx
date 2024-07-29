import React from "react";
import {
  Stack,
  VStack,
  CardBody,
  CardFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Heading,
  Text,
  Card,
  Image as ChakraLink,
  Img,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_CLASS, QUERY_USER } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADDCLASSTOUSER } from "../utils/mutations";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CLASS);
  const [addClassToUser, { error, data2 }] = useMutation(ADDCLASSTOUSER);

  const classes = data?.class || [];

  const handleClick = async (event, _id) => {
    event.preventDefault();
    try {
      const { data2 } = await addClassToUser({
        variables: { id: _id },
      });

      if (error) {
        throw new Error("something went wrong!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return "Loading....";
  }
  return (
    <>
      <VStack spacing={4} align="center">
        <Heading
          as="h2"
          bgGradient="linear(to-t, purple.200, purple.500)"
          p={6}
          boxShadow="dark-lg"
        >
          FitnessFusion
        </Heading>
        <Text>
          Welcome to FitnessFusion were your fitness dreams become reality!!!
        </Text>

        {classes.map((course, index) => {
          return (
            <>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                key={index}
                w="100%"
                m="2"
                bgGradient={
                  index % 2 == 0
                    ? "linear(to-t, purple.100, purple.500)"
                    : "linear(to-t, purple.500, purple.100)"
                }
                boxShadow={
                  index % 2 == 0
                    ? "5px 5px 5px 5px #B19CD9"
                    : "5px 5px 5px 5px #9a7ece"
                }
              >
                <Img
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={course.image}
                  alt={course.name}
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{course.name}</Heading>

                    <Text py="2">{course.description}</Text>
                    {Auth.loggedIn() ? (
                      <>
                        <Text py="2">{course.schedule}</Text>
                        <Text py="2">${course.price}.00</Text>
                      </>
                    ) : null}
                  </CardBody>
                  <CardFooter>
                    {Auth.loggedIn() ? (
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            variant="solid"
                            bgGradient={
                              index % 2 == 0
                                ? "linear(to-t, purple.100, purple.500)"
                                : "linear(to-t, purple.500, purple.100)"
                            }
                            onClick={() => handleClick(event, course._id)}
                          >
                            Add class to membership
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Class has been added to your account!
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Link to="/login">
                        <Button
                          bgGradient={
                            index % 2 == 0
                              ? "linear(to-t, purple.300, purple.600)"
                              : "linear(to-t, purple.300, purple.100)"
                          }
                          _hover={{ color: "white" }}
                        >
                          Login for more details!
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Stack>
              </Card>
            </>
          );
        })}
      </VStack>
    </>
  );
};

export default Home;
