import React, {useContext, useEffect, useMemo, useState} from "react";
import { localization } from "../../util/localization";
import arrowRight from "../../assets/images/arrow-right.svg";
import { LayoutContext } from "../../layout/context";
import getCurrentMonth from "../../util/getCurrentMonth";
import { getCurrentWeek } from "../../util/getCurrentWeek";
import useFetch from "../../hooks/useFetch";
import convertDateMilliseconds from "../../util/convertDateMilliseconds";
import convertDateWithHour from "../../util/convertDateWithHour";
import clock from "../../assets/images/clock.svg";
import convertDate from "../../util/convertDate";
import {
  filterEntryByDay,
  filterEntryByMonth,
  filterEntryByWeek,
} from "./handleEntryFilter";
import EntryTableItemInvoice from "./EntryTableItemInvoice";
import LoadingSpinner from "../Loading/LoadingSpinner";
import useFilter from "../../hooks/useFilter";
import EntryTableItemOrder from "./EntryTableItemOrder";
import EntryFilterComponent from "./EntryFilterComponent";

export const ReceivedInvoice = ({history, location}) => {
  const { current_lang } = useContext(LayoutContext);

  const fetchUrl =
    "https://api.edi.md/WebPortalEDXService/json/GetReceivedInvoiceList?";

  const [
    getToday,
    getMonth,
    getWeek,
    getCustom,
    showDateInputs,
    invoice,
    handleFilterState,
    activeState,
    activeDate,
    setStartDateInput,
    startDateInput,
    setEndDateInput,
    endDateInput,
    isLoading,
    error,
  ] = useFilter(fetchUrl, "InvoiceList", "InvoicState");

  const entryInvoice = true;


  return (
    <>
      <EntryFilterComponent
        getToday={getToday}
        getMonth={getMonth}
        getWeek={getWeek}
        getCustom={getCustom}
        showDateInputs={showDateInputs}
        handleFilterState={handleFilterState}
        activeState={activeState}
        activeDate={activeDate}
        setStartDateInput={setStartDateInput}
        setEndDateInput={setEndDateInput}
        startDateInput={startDateInput}
        endDateInput={endDateInput}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {entryInvoice ? (
            <EntryTableItemInvoice
              entryData={invoice}
              current_lang={current_lang}
              history={history}
            />
          ) : (
            <EntryTableItemOrder
              entryData={invoice}
              current_lang={current_lang}
              history={history}
            />
          )}
        </>
      )}
    </>
  );
};
