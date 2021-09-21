import { useEffect, useState } from "react";
import { useStore } from "../../common/useStore";
import { Flex, Stack, Skeleton } from "@chakra-ui/react";
import { Post } from "../../types/post";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { PostForm } from "../PostForm";
import { PostCard } from "../PostCard";
import { AlertDialog } from "../AlertDialog";

export const Dashboard = observer(() => {
  const {
    authStore: { isAuthorized, logout, user },
    postStore,
  } = useStore();
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
      <PostForm />
      <Stack
        spacing={0}
        // style={{ maxHeight: "100%", overflowY: "auto" }}
        paddingBottom={5}
      >
        {postStore.state === "pending" && postStore.posts.length === 0 && (
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
