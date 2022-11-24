import React, { useState, useEffect} from 'react';
import { BrowserRouter, Router,  Switch } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import {  login } from './store/session';
import LoginForm from './components/auth/LoginForm';



function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      dispatch(login()); 
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
      <Router path='/login'>
        <LoginForm />
      </Router>
    </Switch>
    </BrowserRouter>
  );
}

export default App;