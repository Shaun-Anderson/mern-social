import React from "react";
import { Box, Button, MenuIcon, Textarea } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useStore } from "../common/useStore";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";
import { useState } from "react";

interface PostFormProps {
  //onSubmit: (data: Post) => {};
}

export const PostForm = (props: PostFormProps) => {
  const {
    postStore: { add },
  } = useStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Post>();
  const onSubmit = async (data: Post) => {
    setLoading(true);
    await add(data);
    setLoading(false);
    reset();
  };
  const [loading, setLoading] = useState(false);
  return (
    <Box
      textAlign="right"
      p={5}
      shadow="sm"
      borderWidth="1px"
      rounded="xl"
      mb={5}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          placeholder="Post"
          //size="sm"
          variant="filled"
          resize="vertical"
          isInvalid={errors.title ? true : false}
          {...register("title")}
          mb={3}
        />
        <Button
          borderRadius={10}
          isLoading={loading}
          loadingText="Submitting"
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
  );
};
