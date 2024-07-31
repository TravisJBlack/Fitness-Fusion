import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Text, VStack } from "@chakra-ui/react";
import ClassItem from "./ClassItem";

const GET_CLASSES = gql`
  query GetClasses {
    classes {
      _id
      name
      description
      price
      schedule
    }
  }
`;

const ClassList = () => {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Available Classes
      </Text>
      <VStack spacing={4}>
        {data.classes.map((classItem) => (
          <ClassItem key={classItem._id} classItem={classItem} />
        ))}
      </VStack>
    </Box>
  );
};

export default ClassList;
