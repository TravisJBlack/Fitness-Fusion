import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Box, Button, Heading, Text, VStack, FormControl, FormLabel, Alert, AlertIcon } from '@chakra-ui/react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    } else {
      const { id } = paymentMethod;
      try {
        const response = await fetch('http://localhost:3001/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          setErrorMessage('Failed to create checkout session.');
          setLoading(false);
          return;
        }

        const data = await response.json();
        stripe.redirectToCheckout({ sessionId: data.id });
      } catch (fetchError) {
        setErrorMessage('Error fetching checkout session.');
        setLoading(false);
      }
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={4}>
        <Heading as="h2" size="lg" color="purple.600">
          Checkout
        </Heading>
        <Text>Complete your purchase by providing your payment details below.</Text>
        {errorMessage && (
          <Alert status="error">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
        <FormControl>
          <FormLabel>Card Details</FormLabel>
          <Box
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
            bg="gray.50"
          >
            <CardElement />
          </Box>
        </FormControl>
        <Button
          mt={4}
          colorScheme="purple"
          onClick={handleSubmit}
          isLoading={loading}
        >
          {loading ? 'Processing...' : 'Pay'}
        </Button>
      </VStack>
    </Box>
  );
};

export default CheckoutForm;
