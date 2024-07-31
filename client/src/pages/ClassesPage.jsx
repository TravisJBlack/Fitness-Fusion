import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Box, Heading, Input, VStack, Button } from "@chakra-ui/react";
import { QUERY_CLASSES_BY_NAME } from "../utils/queries";
import ClassItem from "../components/Classes/ClassItem";

const ClassesPage = () => {
  const [search, setSearch] = useState("");
  const [getClassesByName, { loading, data, error }] = useLazyQuery(
    QUERY_CLASSES_BY_NAME
  );

  if (error) {
    console.log(JSON.stringify(error));
  }

  const handleSearch = () => {
    getClassesByName({ variables: { name: search } });
  };

  return (
    <Box>
      <Heading as="h2" mb={4}>
        Classes
      </Heading>
      <Input
        placeholder="Search classes by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={handleSearch} mt={2} colorScheme="teal">
        Search
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <VStack spacing={4} align="stretch" mt={4}>
          {data.getClassesByName.map((classItem) => (
            <ClassItem key={classItem._id} classItem={classItem} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ClassesPage;
