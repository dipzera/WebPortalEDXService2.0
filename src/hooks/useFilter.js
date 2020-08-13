import React, {useEffect, useState} from 'react';
import getCurrentMonth from "../util/getCurrentMonth"
import useFetch from "./useFetch"
import {filterEntryByDay, filterEntryByMonth, filterEntryByWeek} from "../components/Entry/handleEntryFilter"

const useFilter = (fetchUrl, listType, stateType) => {

  let currentMonth = getCurrentMonth();
  const params = new URLSearchParams({
    TKey: JSON.parse(localStorage.getItem("Token")),
    // DStart: "2000-01-01",
    // DEnd: "2030-01-01",
    DStart: currentMonth[0],
    DEnd: currentMonth[1],
  });

  let [startDateInput, setStartDateInput] = useState(
    JSON.parse(localStorage.getItem("startDateInput")) || currentMonth[0]
  );
  let [endDateInput, setEndDateInput] = useState(
    JSON.parse(localStorage.getItem("endDateInput")) || currentMonth[1]
  );
  let [invoice, setInvoice] = useState([]);
  let [activeState, setActiveState] = useState(
    JSON.parse(localStorage.getItem("ButtonState")) || 50
  );
  let [activeDate, setActiveDate] = useState(
    JSON.parse(localStorage.getItem("DateButtonState")) || 2
  );



  const { response, error, isLoading } = useFetch({
    method: "get",
    url: fetchUrl + params.toString(),
  });



  useEffect(() => {
    if (response !== null) {
      if (activeDate === 0) {
        getToday();
      } else if (activeDate === 1) {
        getWeek();
      } else if (activeDate === 2) {
        getMonth();
      } else if (activeDate === 3) {
        showDateInputs();
        getCustom();
      }
    }
  }, [response, activeDate, activeState]);

  useEffect(() => {
    if (response !== null && activeDate == 3) {
      getCustom();
      showDateInputs();
    }
  }, [response, activeState, activeDate]);

  const getToday = () => {
    setActiveDate(
      0,
      localStorage.setItem("DateButtonState", JSON.stringify("0"))
    );
    setInvoice(
      response[listType].filter((item) => filterEntryByDay(item, activeState))
    );
  };

  const getWeek = () => {
    setActiveDate(
      1,
      localStorage.setItem("DateButtonState", JSON.stringify("1"))
    );
    setInvoice(
      response[listType].filter((item) =>
        filterEntryByWeek(item, activeState)
      )
    );
  };

  const getMonth = () => {
    setActiveDate(
      2,
      localStorage.setItem("DateButtonState", JSON.stringify("2"))
    );
    setInvoice(
      response[listType].filter((item) =>
        filterEntryByMonth(item, activeState)
      )
    );
  };

  const getCustom = () => {
    setActiveDate(
      3,
      localStorage.setItem("DateButtonState", JSON.stringify("3"))
    );
    const params = new URLSearchParams({
      TKey: JSON.parse(localStorage.getItem("Token")),
      DStart: startDateInput,
      DEnd: endDateInput,
    });
    fetch(fetchUrl + params.toString())
      .then((response) => response.json())
      .then((data) => {
        if (activeState == 50) {
          setInvoice(data[listType]);
        } else {
          setInvoice(
            data[listType].filter((item) => item[stateType] == activeState)
          );
        }
      });
  };

  const showDateInputs = () => {
    setActiveDate(
      3,
      localStorage.setItem("DateButtonState", JSON.stringify("3"))
    );
  };

  const handleFilterState = (id) => {
    setActiveState(id, localStorage.setItem("ButtonState", JSON.stringify(id)));
  };
  return [ getToday, getMonth, getWeek, getCustom, showDateInputs, invoice, handleFilterState, activeState, activeDate, setStartDateInput, startDateInput, setEndDateInput, endDateInput, isLoading, error]
};

export default useFilter;