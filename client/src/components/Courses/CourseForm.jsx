import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const ENROLL_COURSE = gql`
  mutation EnrollCourse($courseId: ID!, $name: String!, $email: String!) {
    enrollCourse(courseId: $courseId, name: $name, email: $email) {
      id
      name
    }
  }
`;

const CourseForm = ({ courseId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollCourse] = useMutation(ENROLL_COURSE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enrollCourse({ variables: { courseId, name, email } });
      alert("Enrollment successful");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Enrollement failed");
    }
  };

  return (
    <Box>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
        Enroll
      </Button>
    </Box>
  );
};

export default CourseForm;
