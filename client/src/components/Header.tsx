import React from "react";
import { Box, MenuIcon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}
const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return <MenuToggle toggle={toggle} isOpen={isOpen} />;
};

interface MenuItemProps {
  toggle: () => void;
  isOpen: boolean;
}
