import { Box, Text, Heading } from "@chakra-ui/react";
import Button from "../Shared/Button";

const ClassItem = ({ classItem, onEnroll }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{classItem.name}</Heading>
      <Text mt={4}>{classItem.description}</Text>
      <Text mt={4}>Price: ${classItem.price}</Text>
      <Text mt={4}>Schedule: {classItem.schedule}</Text>
      <Button mt={4} colorScheme="teal" onClick={onEnroll}>
        Enroll
      </Button>
    </Box>
  );
};

export default ClassItem;
