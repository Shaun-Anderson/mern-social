import {
  AlertDialog as BaseDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
}

export const AlertDialog = (props: AlertDialogProps) => {
  const cancelRef = useRef();

  return (
    <BaseDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef.current}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Post
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to remove this post? the image data will be
            removed.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef.current} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={props.onSubmit} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </BaseDialog>
  );
};
