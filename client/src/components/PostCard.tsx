import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  MenuIcon,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useStore } from "../common/useStore";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";

interface PostCardProps {
  post: Post;
  deleteButtonPressed: (data: Post) => Promise<void>;
}
export const PostCard = ({ post, deleteButtonPressed }: PostCardProps) => {
  const {
    authStore: { user },
    postStore: { like, unlike },
  } = useStore();
  return (
    <Box p={5} shadow="sm" borderWidth="1px" rounded="xl">
      <img src={post.imageUrl} />
      <Text mb={3}>{post.title}</Text>
      <Flex>
        <HStack>
          <Button
            size="sm"
            colorScheme="blue"
            variant={
              post.likes.some(({ _id }) => _id === user?._id)
                ? "solid"
                : "outline"
            }
            onClick={
              post.likes.some(({ _id }) => _id === user?._id)
                ? () => unlike(post, user!)
                : () => like(post, user!)
            }
          >
            {post.likes.length} Likes
          </Button>

          {post.postedBy._id === user?._id && (
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              onClick={() => deleteButtonPressed(post)}
            >
              Delete
            </Button>
          )}
        </HStack>
        <Spacer />
        <HStack>
          <Text>{post.postedBy.name}</Text>
          <Avatar
            name={post.postedBy.name}
            src={post.postedBy.profileImageUrl}
            size="sm"
          />
        </HStack>
      </Flex>
    </Box>
  );
};
