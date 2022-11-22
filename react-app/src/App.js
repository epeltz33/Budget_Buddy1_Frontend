import React, { useState, useEffect} from 'react';
import { BrowserRouter, Router,  Switch } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { authenticate } from './store/session';




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <h1>Home</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
