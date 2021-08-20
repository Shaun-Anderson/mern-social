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
  Switch,
  Grid,
  Textarea
} from "@chakra-ui/react";
import { Post } from '../../types/post';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx'
import { useColorMode, useColorModeValue } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
import { PostForm } from '../PostForm';
import { PostCard } from '../PostCard';

export const Dashboard = observer(() => {
  const { authStore: { isAuthorized, logout, user }, postStore } = useStore()
  const { toggleColorMode, colorMode } = useColorMode()


  useEffect(() => {
    postStore.fetchPosts()
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
      <Heading mb={4}>Mern Post</Heading>
      </Box>
      <Spacer />
                <Box>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="email-alerts" mb="0" mr={2}>
                            <SunIcon verticalAlign="middle" />
                        </FormLabel>
                            <Switch id="email-alerts" checked={colorMode === "light" ? false : true } onChange={toggleColorMode}/>
                        <FormLabel htmlFor="email-alerts" mb="0" mr={0} ml={2}>
                            <MoonIcon/>
                        </FormLabel>
                    </FormControl>
                </Box>
<Box> 
    <Avatar name={user?.name} src={user?.profileImageUrl}  size="sm"     onClick={(e) => logout() }
/>
</Box>

    </Box>

    <PostForm onSubmit={(post: Post) => postStore.add(post)} />
    <Stack spacing={4}>

      {console.log(postStore.posts)}
    {postStore.posts.map(function (post) {
      return (<PostCard key={post._id} post={toJS(post)} />)
    })}
    </Stack>
    </Flex>
  );
})

