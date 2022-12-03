import React from "react";
import { useSelector } from "react-redux";
import MainPanel from "../MainPanel/MainPanel";
import FilterProvider from "../../context/FilterContext";
import "./Splash.css";
import SidePanel from "../SidePanel/SidePanel";

const Splash = () => {
  const sessionUser = useSelector((state) => state.session.user); // this is the user object from the session slice of state in the store

  return sessionUser ? ( // if there is a user in the session slice of state, render the main panel and side panel
    <div className="HomeContainer">
      <FilterProvider>
        <SidePanel />
        <MainPanel />
      </FilterProvider>
    </div>
  ) : (
    <div className="Splash"></div>
  );
};

export default Splash;
