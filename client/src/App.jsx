import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Heading, Text, VStack } from "@chakra-ui/react";
import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const Home = () => (
  <VStack spacing={4} align="center">
    <Heading as="h2">Home</Heading>
    <Text>
      Welcome to FitnessFusion! Click on the links above to login or sign up.
    </Text>
  </VStack>
);

export default App;
