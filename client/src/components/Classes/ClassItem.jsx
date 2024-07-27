import React from "react";
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADDCLASSTOUSER } from "../../utils/mutations";

const ClassItem = ({ classItem }) => {
  const [addClassToUser, { error }] = useMutation(ADDCLASSTOUSER);

  const handleEnroll = async () => {
    try {
      await addClassToUser({
        variables: { id: classItem._id },
      });
      alert("Enrolled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to enroll.");
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{classItem.name}</Heading>
      <Text mt={4}>{classItem.description}</Text>
      <Text mt={4}>Price: ${classItem.price}</Text>
      <Text mt={4}>Schedule: {classItem.schedule}</Text>
      <Button mt={4} colorScheme="teal" onClick={handleEnroll}>
        Enroll
      </Button>
      {error && (
        <Text mt={2} color="red.500">
          {error.message}
        </Text>
      )}
    </Box>
  );
};

export default ClassItem;
