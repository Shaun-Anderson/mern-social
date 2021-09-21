import React, { createRef, useRef } from "react";
import {
  Box,
  Button,
  FormErrorMessage,
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
      p={5}
      shadow="sm"
      borderWidth="1px"
      rounded="xl"
      mb={5}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Image src={postImage} alt="Post image" rounded="xl" />

        <Textarea
          placeholder="Post"
          //size="sm"
          variant="filled"
          resize="vertical"
          isInvalid={errors.title ? true : false}
          {...register("title")}
          mb={3}
        />
        <input
          type="file"
          onChange={handleImageChange}
          hidden
          ref={fileInput}
        />
        <IconButton
          aria-label="Add image"
          icon={<Icon as={PaperClipIcon} />}
          rounded="xl"
          mr={1}
          onClick={() => {
            if (fileInput.current !== null) {
              fileInput.current!.click();
            }
            // at this point if you need to trigger click then invoke .click() instead
          }}
        />
        <Button
          rounded="xl"
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
