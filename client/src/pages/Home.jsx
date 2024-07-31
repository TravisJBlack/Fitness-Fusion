import React, { useState, useEffect } from "react";

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
  const { loading: classLoading, data: classData } = useQuery(QUERY_CLASS);
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);

  const [addClassToUser, { error, data: data2 }] = useMutation(ADDCLASSTOUSER);

  const classes = classData?.class || [];
  let user = userData?.user || [];

  if (error) console.log(JSON.stringify(error));

  const [userClass, setUserClass] = useState([]);
  const timeout = async function (delay) {
    return new Promise((res) => setTimeout(res, delay * 1000));
  };

  useEffect(() => {
    // setUserClass([...userClass, "peanuts"]);
    if (user.classes) {
      let userArray = [];
      for (let i = 0; i < user.classes.length; i++) {
        console.log(user.classes);
        // return setUserClass([...userClass, user.classes[i]._id]);
        // console.log(user.classes[i]._id);
        // console.log(...userClass);
        userArray.push(user.classes[i]._id);
      }
      setUserClass(userArray);
    }
  }, [user]);

  const handleClick = async (event, _id) => {
    event.preventDefault();
    console.log(_id);
    console.log("USERCLASS: ", userClass);
    await timeout(5);
    try {
      const { data } = await addClassToUser({
        variables: { id: _id },
      });
      console.log(data.addClassToUser);
      user = data.addClassToUser;
      if (error) {
        throw new Error("something went wrong!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (classLoading) {
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
                          onClick={(event) => handleClick(event, course._id)}
                        >
                          Add class to membership
                        </Button>
                      </PopoverTrigger>
                      {userClass.includes(course._id) ? (
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Already Enrolled!!</PopoverHeader>
                          <PopoverBody>
                            Look forward to seeing you in class!!!
                          </PopoverBody>
                        </PopoverContent>
                      ) : (
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Class has been added to your account!
                          </PopoverBody>
                        </PopoverContent>
                      )}
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
          );
        })}
      </VStack>
    </>
  );
};

export default Home;
