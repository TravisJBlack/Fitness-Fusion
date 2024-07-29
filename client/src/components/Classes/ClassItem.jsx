import React from "react";
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADDCLASSTOUSER } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";

const ClassItem = ({ classItem }) => {
  const [addClassToUser] = useMutation(ADDCLASSTOUSER, {
    refetchQueries: [{ query: QUERY_USER }],
  });

  const handleEnroll = async () => {
    try {
      await addClassToUser({ variables: { id: classItem._id } });
      alert("Enrolled successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to enroll");
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
    </Box>
  );
};

export default ClassItem;
