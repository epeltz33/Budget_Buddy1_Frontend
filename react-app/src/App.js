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

  const [loaded, setLoaded] = useState(false);
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
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="*" element={<Splash />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
