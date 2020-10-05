import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Balance from "../components/Dashboard/Balance";
import EntryList from "../components/Dashboard/EntryList";
import { LayoutContext } from "./context";
import getCurrentMonth from "../util/getCurrentMonth";
import { getCurrentWeek } from "../util/getCurrentWeek";
import useFetch from "../hooks/useFetch";
import convertDateMilliseconds from "../util/convertDateMilliseconds";
import { scrollToTop } from "../util/scrollToTop";
import {
  filterEntryByDay,
  filterEntryByMonth,
  filterEntryByWeek,
} from "../components/Entry/handleEntryFilter";
import history from "../util/history";
import useFilter from "../hooks/useFilter";

import axios from "axios";

const AuthLayout = ({ children, history, path, location }) => {
  // useEffect(() => {
  //   if (localStorage.getItem("Token") === null) {
  //     history.push("/login");
  //   } else {
  //     history.push(path);
  //   }
  // }, []);
  useEffect(() => {
    axios
      .get(
        "https://api.edi.md/WebPortalEDXService/json/TokenIsValid?",
        {
          params: {
            Token: JSON.parse(localStorage.getItem("Token")),
          },
        }
      )
      .then((res) => {
        if (res.data["ErrorCode"] !== 0) {
          history.push("/login");
          window.location.reload();
        }
      });
  }, []);
  const current_lang =
    JSON.parse(localStorage.getItem("Language")) === null
      ? "ro"
      : JSON.parse(localStorage.getItem("Language"));

  useEffect(() => {
    scrollToTop(document.querySelector(".scroll-up"));
    window.scrollTo({ top: 0 });
    // window.onerror = () => {
    //   window.location.replace('/login');
    // }
  }, []);

  return (
    <LayoutContext.Provider value={{ current_lang }}>
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
