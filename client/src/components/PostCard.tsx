import React from "react"
import { Avatar, Box, Button, MenuIcon, Text, Textarea } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { useStore } from "../common/useStore"
import { useForm } from "react-hook-form";
import { Post } from "../types/post";

interface PostCardProps {
    post: Post
}
export const PostCard = ({ post }: PostCardProps) => {
    //const { postStore: { add } } = useStore()

    return(
      <Box p={5} shadow="sm" borderWidth="1px" rounded="xl">
        <Text >{post.title}</Text>
        <Avatar name={post.postedBy.name} src={post.postedBy.profileImageUrl} size="sm" />
      </Box>
    )
  }
