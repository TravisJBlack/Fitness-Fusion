import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Text, Heading, VStack } from "@chakra-ui/react";
import { QUERY_USER } from "../../utils/queries";
import { useParams } from "react-router-dom";
import ClassForm from "../Classes/ClassForm";

const Profile = () => {
  const { username } = useParams();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { user } = data;

  return (
    <Box>
      <Heading as="h2">{user.username}'s Profile</Heading>
      <Text>Email: {user.email}</Text>
      <Text>Age: {user.age}</Text>

      <Heading as="h3" mt={4}>
        Enrolled Classes
      </Heading>
      <VStack spacing={4} align="start">
        {user.classes.map((classItem) => (
          <Box key={classItem._id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{classItem.name}</Heading>
            <Text mt={4}>{classItem.description}</Text>
            <Text mt={4}>Schedule: {classItem.schedule}</Text>
            <Text mt={4}>Price: ${classItem.price}</Text>
          </Box>
        ))}
      </VStack>

      <Heading as="h3" mt={8}>
        Enroll in a New Class
      </Heading>
      <ClassForm />
    </Box>
  );
};

export default Profile;
