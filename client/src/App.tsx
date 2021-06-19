import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useStore } from './common/useStore'
import { Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import { PrivateRoute } from './components/PrivateRoute'
import { AuthStore } from './store/auth';
function App() {
  const { authStore: { isAuthorized, load } } = useStore()
  const [data, setData] = useState<string>("");

  const login = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  }

  useEffect(() => {
    async function getToken() {
      const token = await load();
      setData("hi")
    }
    getToken();
  }, []);

  if(!data.length) return (<span>loading...</span>);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <li onClick={login}>Login</li>

      </header>
      <Switch>
      <PrivateRoute isAuthorized={isAuthorized} exact path="/" component={Dashboard} />
      <PrivateRoute isAuthorized={isAuthorized} path="/Dashboard" component={Dashboard} />
      <Route exact path="/Login"><Login></Login></Route>
      </Switch>
    </div>
  );
}

export default App;
