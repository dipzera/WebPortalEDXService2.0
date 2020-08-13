import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Balance from "../Dashboard/Balance";
import EntryList from "../Dashboard/EntryList";
import { LayoutContext } from "./context";
import getCurrentMonth from "../../util/getCurrentMonth";
import { getCurrentWeek } from "../../util/getCurrentWeek";
import useFetch from "../../hooks/useFetch";
import convertDateMilliseconds from "../../util/convertDateMilliseconds";
import { scrollToTop } from "../../util/scrollToTop";
import {
  filterEntryByDay,
  filterEntryByMonth,
  filterEntryByWeek,
} from "../Entry/handleEntryFilter";

const AuthLayout = ({ children, history, path }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    localStorage.getItem("Token") ? history.push(path) : history.push("/login");
  }, []);

  const current_lang = JSON.parse(localStorage.getItem("Language"));


  useEffect(() => {
    scrollToTop(document.querySelector(".scroll-up"));
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        current_lang,
      }}
    >
      <Sidebar />
      <div className={"body-content"}>
        <Header />
        <div className={"container-fluid"}> {children} </div>
        <div className="scroll-up active" />
      </div>
    </LayoutContext.Provider>
  );
};

export default AuthLayout;
