import React, { useState, useEffect} from 'react';
import { BrowserRouter, Router,  Switch } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import {  login } from './store/session';
import LoginForm from './components/auth/LoginForm';
import {authenticate} from './store/session';
 


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/sign-up">
          <SignUpForm />
        </Route>
        <Route path="/">
          <Splash />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;