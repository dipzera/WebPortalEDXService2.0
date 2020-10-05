import React from "react";
import dollarSign from "../../assets/images/dollar-sign.png";
import cart from "../../assets/images/cart.png";
import Balance from "./Balance";
import EntryList from "./EntryList";
import Header from "../Header/Header";
import Graph from "./Graph/Graph";
import useFetch from "../../hooks/useFetch";
import { DashboardContext } from "./DashboardContext";
import getCurrentMonth from "../../util/getCurrentMonth"




export const Dashboard = ({ history }) => {

  const currentMonth = getCurrentMonth()
  const params = new URLSearchParams({
    TKey: JSON.parse(localStorage.getItem("Token")),
    // DStart: "2000-01-01",
    // DEnd: "2030-01-01",
    DStart: currentMonth[0],
    DEnd: currentMonth[1],
  });

  /* Custom Hook Way */
  const {
    response: receivedInvoice,
    isLoading: receivedInvoiceLoading,
    error: receivedInvoiceError,
  } = useFetch({
    method: "get",
    url:
      "https://api.edi.md/WebPortalEDXService/json/GetReceivedInvoiceList?" +
      params.toString(),
  });

  const {
    response: sentInvoice,
    isLoading: sentInvoiceLoading,
    error: sentInvoiceError,
  } = useFetch({
    method: "get",
    url:
      "https://api.edi.md/WebPortalEDXService/json/GetSentInvoiceList?" +
      params.toString(),
  });

  const {
    response: receivedOrder,
    isLoading: receivedOrderLoading,
    error: receivedOrderError,
  } = useFetch({
    method: "get",
    url:
      "https://api.edi.md/WebPortalEDXService/json/GetReceivedOrders?" +
      params.toString(),
  });

  const {
    response: sentOrder,
    isLoading: sentOrderLoading,
    error: sentOrderError,
  } = useFetch({
    method: "get",
    url:
      "https://api.edi.md/WebPortalEDXService/json/GetSentOrders?" +
      params.toString(),
  });

  const handleEntryFilterByLength = (entry, entryType, entryState, stateId, total = false) => {
    if (entry) {
      if (total === false) {
        return entry[entryType].filter(item => item[entryState] === stateId).length
      } else {
        return entry[entryType].length;
      }
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        receivedInvoice,
        receivedOrder,
        sentInvoice,
        sentOrder,
        receivedInvoiceLoading,
        receivedOrderLoading,
        sentInvoiceLoading,
        sentOrderLoading,
        handleEntryFilterByLength
      }}
    >
      <Balance />
      <EntryList history={history}/>
      <Graph />
    </DashboardContext.Provider>
  );
};
