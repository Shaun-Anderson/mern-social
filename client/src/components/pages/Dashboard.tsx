import React, { useEffect, useState } from 'react';
import { useStore } from '../../common/useStore'
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
  Text,
  Spacer,
  FormLabel,
  Switch
} from "@chakra-ui/react";
import { Todo } from '../../types/todo';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx'
import { useColorMode, useColorModeValue } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"

export const Dashboard = observer(() => {
  const { authStore: { isAuthorized, logout, username }, todoStore } = useStore()
  const { toggleColorMode, colorMode } = useColorMode()

  //const [todos, setTodos] = useState<Todo[]>(todoStore.todos);

  useEffect(() => {
    todoStore.fetchTodos()
  }, [])

  return (
    <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
   // backgroundColor="gray.200"
    padding={3}
   // alignItems="center"
  >
    <Box width="full" display="flex" alignItems="center"
>
      <Box flexGrow={1}>
      <Heading mb={4}>Mern Todo</Heading>
      </Box>
      <Spacer />
                <Box>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="email-alerts" mb="0" mr={2}>
                            <SunIcon/>
                        </FormLabel>
                            <Switch id="email-alerts" checked={colorMode === "light" ? false : true } onChange={toggleColorMode}/>
                        <FormLabel htmlFor="email-alerts" mb="0" mr={0} ml={2}>
                            <MoonIcon/>
                        </FormLabel>
                    </FormControl>
                </Box>
<Box>      <Button
      borderRadius={10}
      type="button"
      variant="solid"
      colorScheme="teal"
      width="full"
      onClick={(e) => logout() }
    >
      {username}
    </Button></Box>

    </Box>
      <Button
      borderRadius={10}
      type="button"
      variant="solid"
      colorScheme="teal"
      width="full"
      onClick={(e) => todoStore.add({
        _id: "0",
        title: "test",
        completed: false,
        createdBy: "test"
      }) }
    >
      Add Recipe
    </Button>


      {console.log(todoStore.todos)}
    {todoStore.todos.map(function (todo) {
      console.log(toJS(todo)
      )
      return (<div key={todo._id}>{todo.title}</div>)
    })}
    </Flex>
  );
})

