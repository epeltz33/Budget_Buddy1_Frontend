import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import NavBar from "./components/NavBar/Navbar";
import SignUpForm from "./components/auth/SignUpForm";
import Splash from "./components/Splash/Splash";
import Footer from "./components/Footer/Footer";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false); // this is a boolean that will be set to true when the app is loaded

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  //if (!loaded) {
  // if the app is not loaded, return null
  //return null;
  //}

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="*" element={<Splash />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
