import { useQuery, gql } from "@apollo/client";
import { Box, Text, VStack } from "@chakra-ui/react";
import CourseItem from "./CourseItem";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
      description
    }
  }
`;

const CourseList = () => {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Available Courses
      </Text>
      <VStack spacing={4}>
        {data.courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </VStack>
    </Box>
  );
};

export default CourseList;
