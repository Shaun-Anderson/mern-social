import { FC } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useStore } from "../common/useStore";

interface Props {
  element: React.ReactElement;
  path?: string;
}

const PrivateElement: FC<Props> = ({ element }) => {
  const {
    authStore: { isAuthorized, load, logout, user },
  } = useStore();
  let location = useLocation();

  // if (loading) return <p>Loading.. </p>;

  return isAuthorized ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export const PrivateRoute: FC<Props> = ({ element, ...rest }) => {
  return <Route {...rest} element={<PrivateElement element={element} />} />;
};
