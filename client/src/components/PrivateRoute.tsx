import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: any;
  isAuthorized: boolean;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuthorized, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthorized ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/Login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
