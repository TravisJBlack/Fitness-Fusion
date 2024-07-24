import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseList from "../components/Courses/ClassList";
import CourseForm from "../components/Courses/ClassForm";

const CoursesPage = () => {
  return (
    <Router>
      <Box p={4}>
        <Text fontSize="3xl" mb={4}>
          Courses
        </Text>
        <Switch>
          <Route exact path="/courses" component={CourseList} />
          <Route path="/courses/enroll/:courseId" component={CourseForm} />
        </Switch>
      </Box>
    </Router>
  );
};

export default CoursesPage;
