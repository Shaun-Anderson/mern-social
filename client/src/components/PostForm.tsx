import React, { createRef, useRef } from "react";
import {
  Box,
  Button,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  MenuIcon,
  Textarea,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useStore } from "../common/useStore";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PaperClipIcon } from "@heroicons/react/outline";
import { Image } from "@chakra-ui/react";

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
    setPostImage("");
    reset();
  };
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState<string | undefined>(undefined);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: any) => {
    setValue("image", event.target.files[0]);
    setPostImage(URL.createObjectURL(event.target.files[0]));
  };

  const onError = (errors: any) => console.log(errors);

  return (
    <Box
      textAlign="right"
      //p={5}
      //shadow="lg"
      //borderWidth="1px"
      rounded="xl"
      mb={5}
      background="gray.100"
      //overflow="hidden"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {postImage && (
          <Image
            //htmlWidth={782}
            src={postImage}
            alt="Post image"
            rounded="xl"
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          />
        )}

        <Textarea
          placeholder="Post"
          //size="sm"
          rounded="xl"
          variant="filled"
          resize="vertical"
          isInvalid={errors.title ? true : false}
          {...register("title")}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        />
        <input
          type="file"
          onChange={handleImageChange}
          hidden
          ref={fileInput}
        />
        <HStack p={2} justify="right">
          <Button
            rounded="xl"
            variant="solid"
            size="sm"
            onClick={() => {
              setPostImage("");
              reset();
            }}
          >
            Clear
          </Button>
          <IconButton
            aria-label="Add image"
            icon={<Icon as={PaperClipIcon} />}
            rounded="xl"
            size="sm"
            mr={1}
            onClick={() => {
              if (fileInput.current !== null) {
                fileInput.current!.click();
              }
            }}
          />
          <Button
            rounded="xl"
            size="sm"
            isLoading={loading}
            loadingText="Submitting"
            type="submit"
            variant="solid"
            colorScheme="teal"
          >
            Post
          </Button>
        </HStack>
      </form>
    </Box>
  );
};
