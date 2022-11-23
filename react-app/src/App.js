import React, { useState, useEffect} from 'react';
import { BrowserRouter, Router,  Switch } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { authenticate, login } from './store/session';
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
      <Route path='/login'>
        <LoginForm />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;