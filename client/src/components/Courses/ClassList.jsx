import { useQuery, useMutation, gql } from "@apollo/client";
import { Box, Text, VStack } from "@chakra-ui/react";

import ClassItem from "./ClassItem";
import { ADDCLASSTOUSER } from "../../utils/mutations";

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
  const [addClassToUser] = useMutation(ADDCLASSTOUSER);

  const handleEnroll = async (classId) => {
    try {
      await addClassToUser({
        variables: { id: classId },
      });
      alert("Enrolled sucessfully");
    } catch (err) {
      console.error(err);
      alert("Failed to enroll");
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Available Classes
      </Text>
      <VStack spacing={4}>
        {data.classes.map((classItem) => (
          <ClassItem
            key={classItem._id}
            classItem={classItem}
            onEnroll={() => handleEnroll(classItem._id)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default ClassList;
