import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar/Navbar";
import SignUpForm from "./components/auth/SignUpForm";
import Splash from "./components/Splash/Splash";
import Footer from "./components/Footer/Footer";
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
      <Routes>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/sign-up">
          <SignUpForm />
        </Route>
        <Route path="/">
          <Splash />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
