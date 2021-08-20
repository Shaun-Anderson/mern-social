import React from "react";
import { useStore } from "../../common/useStore";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import {
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

export default function Login() {
  const {
    authStore: { isAuthorized, login },
  } = useStore();

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      // backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">BookShelf</Heading>
        <Box minW={{ base: "90%", md: "300px" }}>
          <Stack
            spacing={4}
            p="1rem"
            //backgroundColor="whiteAlpha.900"
            //boxShadow="md"
          >
            <GoogleLoginButton onClick={() => login()} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
