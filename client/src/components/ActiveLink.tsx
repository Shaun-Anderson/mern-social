import { Link as RouteLink, useMatch } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Children } from "react";
import { Heading, Link, Text } from "@chakra-ui/react";
type NavLinkProps = { text: string; to: string };
const ActiveLink = ({ text, to }: NavLinkProps) => {
  return (
    <Link
      as={RouteLink}
      p={3}
      to={to}
      width="100%"
      rounded="xl"
      display="block"
      backgroundColor={useMatch(to) ? "gray.100" : ""}
      style={{ textDecoration: "none" }}
      _hover={{ backgroundColor: "gray.50" }}
    >
      <Heading as="h6" size="xs">
        {text}
      </Heading>
    </Link>
  );
};

export default ActiveLink;
