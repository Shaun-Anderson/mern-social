import React from "react";
import {
  Box,
  Button,
  FormErrorMessage,
  MenuIcon,
  Textarea,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useStore } from "../common/useStore";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";
import { useState } from "react";
import FileUpload from "./FileUpload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface PostFormProps {
  //onSubmit: (data: Post) => {};
}

export const PostForm = (props: PostFormProps) => {
  const {
    postStore: { add },
  } = useStore();

  const schema = yup.object().shape({
    title: yup.string().required(),
    //image: yup.mixed().required("File is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Post>({ resolver: yupResolver(schema) });
  const onSubmit = async (data: Post) => {
    console.log(data);
    setLoading(true);
    await add(data);
    setLoading(false);
    reset();
  };
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState<string | undefined>(undefined);

  const handleImageChange = (event: any) => {
    setValue("image", event.target.files[0]);
    setPostImage(URL.createObjectURL(event.target.files[0]));
  };

  const onError = (errors: any) => console.log(errors);

  return (
    <Box
      textAlign="right"
      p={5}
      shadow="sm"
      borderWidth="1px"
      rounded="xl"
      mb={5}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <img src={postImage} alt="" />
        <Textarea
          placeholder="Post"
          //size="sm"
          variant="filled"
          resize="vertical"
          isInvalid={errors.title ? true : false}
          {...register("title")}
          mb={3}
        />
        <input type="file" onChange={handleImageChange} />
        <Button
          borderRadius={10}
          isLoading={loading}
          loadingText="Submitting"
          type="submit"
          variant="solid"
          colorScheme="teal"
        >
          Post
        </Button>
      </form>
    </Box>
  );
};
