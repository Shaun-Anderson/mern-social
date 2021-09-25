import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  MenuIcon,
  Spacer,
  Text,
  Textarea,
  VStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  AddIcon,
  CloseIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { useStore } from "../common/useStore";
import { useForm } from "react-hook-form";
import { Post } from "../types/post";
import { HeartIcon as SolidHeart, TrashIcon } from "@heroicons/react/solid";
import {
  HeartIcon as OutlineHeart,
  ChatAlt2Icon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { Image } from "@chakra-ui/react";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";

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
    <LinkBox
      px={[0, 5]}
      py={[2, 5]}
      as="article"
      _hover={{
        background: "gray.50",
      }}
      rounded="xl"
      onClick={(e) => {
        e.preventDefault();
        console.log("open");
      }}
    >
      <LinkOverlay href="#">
        {/* <LinkOverlay href="#wow">Some blog post</LinkOverlay>
      <Box as="a" color="teal.400" href="/post/test" fontWeight="bold">
        Some inner link
      </Box> */}
        <HStack display="flex" alignItems="flex-start">
          <Avatar
            name={post.postedBy.name}
            src={post.postedBy.profileImageUrl}
            size="sm"
          />
          <VStack alignItems="stretch">
            <HStack>
              <Heading as="h5" size="sm">
                {post.postedBy.name}
              </Heading>

              <Text fontSize="xs" color="gray">
                {post.postedAt}
              </Text>
            </HStack>
            <Text mb={5} ml={10}>
              {post.title}
            </Text>
            {post.imageUrl && (
              <Image
                // width={782}
                // height={470}
                src={post.imageUrl}
                alt="Post image"
                rounded="xl"
                fallbackSrc="https://via.placeholder.com/300"
              />
            )}
            <Flex>
              <HStack>
                <Button
                  size="sm"
                  leftIcon={
                    post.likes.some(({ _id }) => _id === user?._id) ? (
                      <Icon as={SolidHeart} />
                    ) : (
                      <Icon as={OutlineHeart} />
                    )
                  }
                  colorScheme={
                    post.likes.some(({ _id }) => _id === user?._id)
                      ? "red"
                      : "gray"
                  }
                  variant="link"
                  onClick={
                    post.likes.some(({ _id }) => _id === user?._id)
                      ? () => unlike(post, user!)
                      : () => like(post, user!)
                  }
                >
                  {post.likes.length}
                </Button>
                <Button
                  size="sm"
                  leftIcon={<Icon as={ChatAlt2Icon} />}
                  colorScheme="gray"
                  variant="link"
                  // onClick={() = {
                  //   // Open comment modal
                  //   console.log("")
                  // }
                >
                  {post.likes.length}
                </Button>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    rounded="xl"
                    size="sm"
                    aria-label="Post Options"
                    icon={<Icon as={DotsHorizontalIcon} />}
                    //variant="outline"
                  />
                  <MenuList>
                    {post.postedBy._id === user?._id && (
                      <MenuItem
                        color="red"
                        icon={<Icon as={TrashIcon} />}
                        onClick={() => deleteButtonPressed(post)}
                      >
                        Remove
                      </MenuItem>
                    )}

                    <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                      Report
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Flex>
          </VStack>
        </HStack>
      </LinkOverlay>
    </LinkBox>
  );
};
