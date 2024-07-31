import React from "react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Link as ChakraLink,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Auth from "../../utils/auth";
import source from "../../../public/images/unnamed.jpg";
import { LuDumbbell } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeMenu = () => {
    isOpen = true;
  }

  return (
    <Box w="100%" minH={100} maxH={'auto'} bgGradient="linear(to-t, purple.200, purple.500)">
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <IconButton
          size="md"
          border='0px'
          bg={'purple.250'}
          _hover={{
    background: "purple.250",
    color: "white",
    border: 'none',
  }}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          icon={isOpen ? <IoMdCloseCircleOutline   size={35}/>  : <LuDumbbell  size={35}/> } 
        />
        <HStack spacing={8} alignItems="center">
          <Box color="white" margin="10" fontWeight="extrabold">
            <Image
              marginTop="10"
              boxSize="50px"
              objectFit="cover"
              src={source}
            />
            FitnessFusion
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <ChakraLink
              as={RouterLink}
              to="/"
              px={2}
              py={1}
              rounded="md"
              _hover={{
                bg: "pink.700",
                textColor: "white",
                fontWeight: "bold",
              }}
            >
              Home
            </ChakraLink>
            <span>|</span>
            {Auth.loggedIn() ? (
              <>
                <ChakraLink
                  as={RouterLink}
                  to="/profile"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Profile
                </ChakraLink>
                <span>|</span>

                <ChakraLink
                  as={RouterLink}
                  to="/workout"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Workout
                </ChakraLink>
                <span>|</span>

                <ChakraLink
                  as={RouterLink}
                  to="/"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                  onClick={Auth.logout}
                >
                  Logout
                </ChakraLink>
              </>
            ) : (
              <>
                <ChakraLink
                  as={RouterLink}
                  to="/login"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Login
                </ChakraLink>
                <span>|</span>
                <ChakraLink
                  as={RouterLink}
                  to="/signup"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Signup
                </ChakraLink>
              </>
            )}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Flex >
          <Box pb={4}  display={{ md: 'none' }}>
            <Stack as={'nav'} bg={"transparent"} spacing={4} zIndex={99}>
            <ChakraLink
              as={RouterLink}
              to="/"
              px={2}
              py={1}
              rounded="md"
              onClick={() => closeMenu()}
              _hover={{
                bg: "pink.700",
                textColor: "white",
                fontWeight: "bold",
              }}
            >
              Home
            </ChakraLink>

            {Auth.loggedIn() ? (
              <>
                <ChakraLink
                  as={RouterLink}
                  to="/profile"
                  px={2}
                  py={1}
                  rounded="md"
              onClick={() => closeMenu()}
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Profile
                </ChakraLink>

                <ChakraLink
                  as={RouterLink}
                  to="/workout"
                  px={2}
                  py={1}
                  rounded="md"
              onClick={() => closeMenu()}
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Workout
                </ChakraLink>
               
                <ChakraLink
                  as={RouterLink}
                  to="/"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                  onClick={Auth.logout}
                >
                  Logout
                </ChakraLink>
              </>
            ) : (
              <>
                <ChakraLink
                  as={RouterLink}
                  to="/login"
                  px={2}
                  py={1}
                  rounded="md"
              onClick={() => closeMenu()}
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Login
                </ChakraLink>
                
                <ChakraLink
                  as={RouterLink}
                  to="/signup"
                  px={2}
                  py={1}
                  rounded="md"
              onClick={() => closeMenu()}
                  _hover={{ bg: "pink.700", textColor: "white", fontWeight: "bold" }}

                >
                  Signup
                </ChakraLink>
              </>
            )}
            </Stack>
          
          </Box>
          </Flex>
        ) : null}
    </Box>
  );
};

export default Header;

// import { useState } from 'react';
// import { Link } from 'react-router-dom';


// const Header = () => {
//   const [openNav, setOpenNav] = useState('hidden');

//   const toggleNav = () => {
//     if (openNav === "hidden") {
//       setOpenNav('');
//     } else {
//       setOpenNav('hidden');
//     }
//   }

//   return (


//     <nav className="bg-gradient-to-b from-purple-500 to-purple-200 border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//       <img src={source} className="w-16 h-16"/>
       

 
//         <button data-collapse-toggle="navbar-default" type="button" onClick={() => toggleNav()}  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
//           <span className="sr-only">Open main menu</span>
//           <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//           </svg>
//         </button>
//         <div className={`${openNav} w-full md:block md:w-auto `} id="navbar-default">
//           <ul className="font-medium flex flex-col p-4 bg-gradient-to-b from-purple-500 to-purple-200 md:p-0 mt-4    md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//             <Link
//           to='/'
//           onClick={() => toggleNav()}
//           className="font-bold hover:bg-black hover:text-white hover:bg-pink-900">
//          Home
//         </Link>
//             </li>
//             <li>
//               <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
//             </li>
//             <li>
//               <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
//             </li>
//             <li>
//               <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
//             </li>
//             <li>
//               <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>


//   )
// }
// export default Header;