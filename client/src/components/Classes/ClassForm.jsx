import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { ADDCLASSTOUSER } from "../../utils/mutations";

const ClassForm = () => {
  const [classId, setClassId] = useState("");

  const [addClassToUser, { error }] = useMutation(ADDCLASSTOUSER);

  const handleChange = (event) => {
    const { value } = event.target;
    setClassId(value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addClassToUser({
        variables: { id: classId },
      });
      alert("Enrolled successfully!");
      setClassId("");
    } catch (e) {
      console.error(e);
      alert("Failed to enroll.");
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <form onSubmit={handleFormSubmit}>
        <FormControl id="classId" isRequired>
          <FormLabel>Class ID</FormLabel>
          <Input
            type="text"
            name="classId"
            value={classId}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Enroll in Class
        </Button>
        {error && (
          <Text mt={2} color="red.500">
            {error.message}
          </Text>
        )}
      </form>
    </Box>
  );
};

export default ClassForm;
