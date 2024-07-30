import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import "./App.css";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Workout from './pages/Workout';
import StripeContainer from './components/StripeContainer';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path='/workout' element={<Workout />} />
            <Route path='/checkout' element={<StripeContainer />} />
            <Route path='/success' element={<SuccessPage />} />
            <Route path='/cancel' element={<CancelPage />} />
          </Routes>
        </Layout>
      </Router>
    </ApolloProvider> 
  );
}

export default App;
