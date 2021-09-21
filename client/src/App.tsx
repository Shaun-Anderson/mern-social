import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useStore } from "./common/useStore";
import { Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import { Dashboard } from "./components/pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthStore } from "./store/auth";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import axios from "axios";

function App() {
  const {
    authStore: { isAuthorized, load },
  } = useStore();
  const [data, setData] = useState<string>("");

  axios.defaults.baseURL = "http://localhost:4000";
  // axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
  // axios.defaults.headers.post['Content-Type'] = 'application/json';

  useEffect(() => {
    async function getToken() {
      const token = await load();
      console.log(token);
      setData("hi");
    }
    getToken();
  }, []);

  if (!data.length) return <span>loading...</span>;

  return (
    <ChakraProvider>
      <Flex
        direction="column"
        //align="center"
        maxW={{ xl: "1500px" }}
        m="0 auto"
        //p={5}
        //h="100%"
        minH="100vh"
      >
        <Switch>
          <PrivateRoute
            isAuthorized={isAuthorized}
            exact
            path="/"
            component={Dashboard}
          />
          <PrivateRoute
            isAuthorized={isAuthorized}
            path="/Dashboard"
            component={Dashboard}
          />
          <Route exact path="/Login">
            <Login></Login>
          </Route>
        </Switch>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
