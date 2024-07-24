import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Button from "../Shared/Button";

const CourseItem = ({ course }) => {
  return (
    <Box p={4} shadow="md" borderWidth="1px">
      <Text fontSize="xl">{course.name}</Text>
      <Text mt={4}>{course.description}</Text>
      <Link to={`/courses/enroll/${course.id}`}>
        <Button mt={4} colorScheme="teal">
          Enroll
        </Button>
      </Link>
    </Box>
  );
};

export default CourseItem;
