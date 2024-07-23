import { Box, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" py={4} textAlign="center">
      <Text>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</Text>
      <Link href="#" mx={2}>
        Privacy Policy
      </Link>
      <Link href="#" mx={2}>
        Terms of Service
      </Link>
    </Box>
  );
};

export default Footer;
