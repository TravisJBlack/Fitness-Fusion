import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Text, Heading, VStack, Button } from "@chakra-ui/react";
import { QUERY_USER, QUERY_SINGLECLASS } from "../../utils/queries";
import { REMOVECLASSFROMUSER } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import ClassForm from "../Classes/ClassForm";

const Profile = () => {
  const { username } = useParams();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  const [selectedClass, setSelectedClass] = useState(null);

  // Fetch single class data based on the selected class name
  const {
    loading: classLoading,
    error: classError,
    data: classData,
  } = useQuery(QUERY_SINGLECLASS, {
    variables: { name: selectedClass },
    skip: !selectedClass, // Skip query if no class is selected
  });

  const [removeClassFromUser] = useMutation(REMOVECLASSFROMUSER, {
    refetchQueries: [{ query: QUERY_USER, variables: { username } }],
  });

  const handleRemoveClass = async (className) => {
    try {
      await removeClassFromUser({ variables: { name: className } });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data?.user || {};

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
            <Heading fontSize="xl">
              <Button
                variant="link"
                onClick={() => setSelectedClass(classItem.name)}
              >
                {classItem.name}
              </Button>
            </Heading>
            <Text mt={4}>{classItem.description}</Text>
            <Text mt={4}>Schedule: {classItem.schedule}</Text>
            <Text mt={4}>Price: ${classItem.price}</Text>
            <Button
              mt={2}
              colorScheme="red"
              onClick={() => handleRemoveClass(classItem.name)}
            >
              Remove Class
            </Button>
          </Box>
        ))}
      </VStack>

      {selectedClass && (
        <Box mt={8}>
          <Heading as="h3">Class Details</Heading>
          {classLoading ? (
            <Text>Loading...</Text>
          ) : classError ? (
            <Text>Error: {classError.message}</Text>
          ) : (
            classData && (
              <Box p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{classData.getSingleClass.name}</Heading>
                <Text mt={4}>{classData.getSingleClass.description}</Text>
                <Text mt={4}>
                  Schedule: {classData.getSingleClass.schedule}
                </Text>
                <Text mt={4}>Price: ${classData.getSingleClass.price}</Text>
                {classData.getSingleClass.image && (
                  <img
                    src={classData.getSingleClass.image}
                    alt={classData.getSingleClass.name}
                  />
                )}
              </Box>
            )
          )}
        </Box>
      )}

      <Heading as="h3" mt={8}>
        Enroll in a New Class
      </Heading>
      <ClassForm />
    </Box>
  );
};

export default Profile;
