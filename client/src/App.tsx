import { useEffect, useState } from "react";
import "./App.css";
import { useStore } from "./common/useStore";
import {
  Route,
  Switch as RouterSwitch,
  Link as RouteLink,
} from "react-router-dom";
import Login from "./components/pages/Login";
import { Dashboard } from "./components/pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Switch,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { Profile } from "./components/pages/Profile";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import ActiveLink from "./components/ActiveLink";

export function AppWrapper() {
  const {
    authStore: { isAuthorized, load, logout, user },
  } = useStore();
  const [data, setData] = useState<string>("");

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
    <RouterSwitch>
      <PrivateRoute isAuthorized={isAuthorized} path="/" component={App} />
      <Route exact path="/Login" component={Login}></Route>
    </RouterSwitch>
  );
}

function App() {
  const smallViewport = useBreakpointValue({ sm: true, md: true, lg: false });
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    authStore: { isAuthorized, load, logout, user },
  } = useStore();
  axios.defaults.baseURL = "http://localhost:4000";
  // axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
  // axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <Flex
      direction="column"
      //align="center"
      maxW={{ xl: "1500px" }}
      m="0 auto"
      //p={5}
      //h="100%"
      minH="100vh"
    >
      <Box width="full" display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Heading mb={4}>Mern Post</Heading>
        </Box>
        <Spacer />
        <Box>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0" mr={2}>
              <SunIcon verticalAlign="middle" />
            </FormLabel>
            <Switch
              id="email-alerts"
              checked={colorMode === "light" ? false : true}
              onChange={toggleColorMode}
            />
            <FormLabel htmlFor="email-alerts" mb="0" mr={0} ml={2}>
              <MoonIcon />
            </FormLabel>
          </FormControl>
        </Box>
        <Box>
          <Avatar
            name={user?.name}
            src={user?.profileImageUrl}
            size="sm"
            onClick={(e) => logout()}
          />
        </Box>
      </Box>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={1} hidden={smallViewport} position="sticky" top="0">
          {/* Sidebar */}
          <ActiveLink to="/" text="Activity" />
          <ActiveLink to="/Profile" text="Profile" />
        </GridItem>
        {/* Main viewport */}
        <GridItem
          colSpan={[5, 5, 5, 3]}
          // style={{ maxHeight: "100%", overflowY: "auto" }}
        >
          <RouterSwitch>
            <PrivateRoute
              isAuthorized={isAuthorized}
              exact
              path="/"
              component={Dashboard}
            />
            <PrivateRoute
              isAuthorized={isAuthorized}
              path="/Profile"
              component={Profile}
            />
            <PrivateRoute
              isAuthorized={isAuthorized}
              path="/Dashboard"
              component={Dashboard}
            />
            {/* <Route exact path="/Login">
              <Login></Login>
            </Route> */}
          </RouterSwitch>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default App;
