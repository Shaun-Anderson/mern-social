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
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Post } from "../../types/post";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { PostForm } from "../PostForm";
import { PostCard } from "../PostCard";
import { AlertDialog } from "../AlertDialog";

export const Profile = observer(() => {
  const {
    authStore: { isAuthorized, logout, user },
    postStore,
  } = useStore();
  const { toggleColorMode, colorMode } = useColorMode();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const smallViewport = useBreakpointValue({ sm: true, md: true, lg: false });
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
      {/* Profile Header */}
      <Box width="full" display="flex" alignItems="center">
        <Avatar name={user?.name} src={user?.profileImageUrl} size="xl" />
        {user?.name}
      </Box>

      <AlertDialog
        title="Delete User"
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
