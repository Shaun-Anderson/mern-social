import React, { useEffect, useState } from "react";
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
  Text,
  Spacer,
  FormLabel,
  Switch,
  Grid,
  Textarea,
  Skeleton,
} from "@chakra-ui/react";
import { Post } from "../../types/post";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { PostForm } from "../PostForm";
import { PostCard } from "../PostCard";
import { AlertDialog } from "../AlertDialog";

export const Dashboard = observer(() => {
  const {
    authStore: { isAuthorized, logout, user },
    postStore,
  } = useStore();
  const { toggleColorMode, colorMode } = useColorMode();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();

  useEffect(() => {
    postStore.fetchPosts();
  }, []);

  const handleDeleteButtonPressed = async (post: Post) => {
    setSelectedPost(post);
    setDeleteAlertOpen(true);
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      // backgroundColor="gray.200"
      padding={3}
      // alignItems="center"
    >
      <Box width="full" display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Heading mb={4}>Mern Post</Heading>
        </Box>
        <Spacer />
        <Box>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0" mr={2}>
              <SunIcon verticalAlign="middle" />
            </FormLabel>
            <Switch
              id="email-alerts"
              checked={colorMode === "light" ? false : true}
              onChange={toggleColorMode}
            />
            <FormLabel htmlFor="email-alerts" mb="0" mr={0} ml={2}>
              <MoonIcon />
            </FormLabel>
          </FormControl>
        </Box>
        <Box>
          <Avatar
            name={user?.name}
            src={user?.profileImageUrl}
            size="sm"
            onClick={(e) => logout()}
          />
        </Box>
      </Box>

      <PostForm />
      <Stack spacing={4}>
        {postStore.state === "pending" && (
          <Stack spacing={4}>
            <Skeleton height="50px" rounded="xl" />
            <Skeleton height="50px" rounded="xl" />
            <Skeleton height="50px" rounded="xl" />
          </Stack>
        )}
        {postStore.posts.map(function (post) {
          return (
            <PostCard
              key={post._id}
              post={toJS(post)}
              deleteButtonPressed={(post: Post) =>
                handleDeleteButtonPressed(post)
              }
            />
          );
        })}
      </Stack>

      <AlertDialog
        title="Delete Post"
        onClose={() => setDeleteAlertOpen(false)}
        onSubmit={async () => {
          await postStore.deletePost(selectedPost!);
          setDeleteAlertOpen(false);
        }}
        isOpen={deleteAlertOpen}
      />
    </Flex>
  );
});
