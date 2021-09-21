import { Link as RouteLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Children } from "react";
import { Link } from "@chakra-ui/react";
type NavLinkProps = { text: string; to: string };
const ActiveLink = ({ text, to }: NavLinkProps) => {
  const history = useHistory();

  return (
    <Link
      as={RouteLink}
      p={2}
      to={to}
      width="100%"
      display="block"
      backgroundColor={history.location.pathname === to ? "gray.100" : ""}
    >
      {text}
    </Link>
  );
};

export default ActiveLink;
