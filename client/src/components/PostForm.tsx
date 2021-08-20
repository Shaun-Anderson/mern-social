import React from "react"
import { Box, Button, MenuIcon, Textarea } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { useStore } from "../common/useStore"
import { useForm } from "react-hook-form";
import { Post } from "../types/post";

interface PostFormProps {
    onSubmit: (data: Post) => {}
}

export const PostForm = (props: PostFormProps) => {
    const { postStore: { add } } = useStore()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Post>();
    const onSubmit = (data: Post) => props.onSubmit(data);

    return(
        <Box textAlign="right">
    <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
                placeholder="Post"
                //size="sm"
                variant="filled"
                resize="vertical"
                isInvalid={errors.title ? true : false}
                {...register("title")} 
              />
              <Button
              borderRadius={10}
              type="submit"
              variant="solid"
              colorScheme="teal"
              //width="sm"
              // onClick={(e) => add({
              //   _id: "0",
              //   title: "test",
              //   completed: false,
              //   createdBy: "test"
              // }) }
            >
              Post
            </Button>
            </form>
            </Box>
    )
  }
