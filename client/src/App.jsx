import { useState } from 'react';
import { Box, Button, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <VStack spacing={4} align="center">
        <Box>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <Image src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <Image src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </Box>
        <Heading as="h1">Vite + React</Heading>
        <Box className="card">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <Text>
            Edit <code>src/App.jsx</code> and save to test HMR
          </Text>
        </Box>
        <Text className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Text>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </VStack>
    </Router>
  );
}

const Home = () => (
  <VStack spacing={4} align="center">
    <Heading as="h2">Home</Heading>
    <Text>Welcome to FitnessFusion! Click on the links above to login or sign up.</Text>
  </VStack>
);

export default App;
