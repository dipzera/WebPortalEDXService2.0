import React, { useContext, useEffect, useState } from "react";
import arrowRight from "../../assets/images/arrow-right.svg";
import { localization } from "../../util/localization";
import { NavLink, useHistory } from "react-router-dom";
import getReceivedInvoiceList from "../../server/getReceivedInvoiceList";
import getSentInvoiceList from "../../server/getSentInvoiceList";
import getReceivedOrders from "../../server/getReceivedOrders";
import getSentOrders from "../../server/getSentOrders";
import getCurrentMonth from "../../util/getCurrentMonth";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { LayoutContext } from "../layout/context";
import LoadingSpinner from "../Loading/LoadingSpinner";

const EntryList = () => {
  const currentMonth = getCurrentMonth();

  const { current_lang } = useContext(LayoutContext);

  const params = new URLSearchParams({
    TKey: JSON.parse(localStorage.getItem("Token")),
    DStart: "2000-01-01",
    DEnd: "2030-01-01",
    // DStart: currentMonth[0],
    // DEnd: currentMonth[1],
  });

  /* Custom Hook Way */
  const {
    response: receivedInvoice,
    isLoading: receivedInvoiceLoading,
    error: receivedInvoiceError,
  } = useFetch({
    method: "get",
    url:
      "http://api.efactura.md:4445/WebPortalEDXService/json/GetReceivedInvoiceList?" +
      params.toString(),
  });

  const {
    response: sentInvoice,
    isLoading: sentInvoiceLoading,
    error: sentInvoiceError,
  } = useFetch({
    method: "get",
    url:
      "http://api.efactura.md:4445/WebPortalEDXService/json/GetSentInvoiceList?" +
      params.toString(),
  });

  const {
    response: receivedOrder,
    isLoading: receivedOrderLoading,
    error: receivedOrderError,
  } = useFetch({
    method: "get",
    url:
      "http://api.efactura.md:4445/WebPortalEDXService/json/GetReceivedOrders?" +
      params.toString(),
  });

  const {
    response: sentOrder,
    isLoading: sentOrderLoading,
    error: sentOrderError,
  } = useFetch({
    method: "get",
    url:
      "http://api.efactura.md:4445/WebPortalEDXService/json/GetSentOrders?" +
      params.toString(),
  });

  return (
    <>
      {receivedInvoiceLoading && sentInvoiceLoading && receivedOrderLoading && sentOrderLoading  ? (
        <LoadingSpinner />
      ) : (
        <div className="dashboard__invoice" id="bigScreen">
          <div className="invoice-col">
            <p className="invoice-col__title">
              {localization[current_lang].dashboard.ReceivedInvoice}
            </p>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Pending}
              </span>
              <span
                id="pendingReceivedInvoice"
                className="invoice-col__status-number"
              >
                {receivedInvoice !== null
                  ? receivedInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 0
                    ).length
                  : receivedInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Processing}
              </span>
              <span
                id="processingReceivedInvoice"
                className="invoice-col__status-number"
              >
                {receivedInvoice !== null
                  ? receivedInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 100
                    ).length
                  : receivedInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Rejected}
              </span>
              <span
                id="unloadedReceivedInvoice"
                className="invoice-col__status-number"
              >
                {" "}
                {/* rejected */}
                {receivedInvoice !== null
                  ? receivedInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 300
                    ).length
                  : receivedInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Accepted}
              </span>
              <span
                id="acceptedReceivedInvoice"
                className="invoice-col__status-number"
              >
                {receivedInvoice !== null
                  ? receivedInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 200
                    ).length
                  : receivedInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span id="totalText" className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.All}
              </span>
              <span
                id="totalReceivedInvoice"
                className="invoice-col__status-number"
              >
                {receivedInvoice !== null
                  ? receivedInvoice.InvoiceList.length
                  : receivedInvoice === "0"}
              </span>
            </div>
            <NavLink to={"/received-invoice"} className="invoice-col__link">
              {localization[current_lang].dashboard.Details}
              <span>
                <img src={arrowRight} alt="Arrow right" />
              </span>
            </NavLink>
          </div>

          <div className="invoice-col">
            <p className="invoice-col__title">
              {localization[current_lang].dashboard.SentInvoice}
            </p>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Pending}
              </span>
              <span
                id="pendingSentInvoice"
                className="invoice-col__status-number"
              >
                {sentInvoice !== null
                  ? sentInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 0
                    ).length
                  : sentInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Processing}
              </span>
              <span
                id="processingSentInvoice"
                className="invoice-col__status-number"
              >
                {sentInvoice !== null
                  ? sentInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 100
                    ).length
                  : sentInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Rejected}
              </span>
              <span
                id="unloadedSentInvoice"
                className="invoice-col__status-number"
              >
                {sentInvoice !== null
                  ? sentInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 300
                    ).length
                  : sentInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Accepted}
              </span>
              <span
                id="acceptedSentInvoice"
                className="invoice-col__status-number"
              >
                {sentInvoice !== null
                  ? sentInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 200
                    ).length
                  : sentInvoice === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span id="totalText" className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.All}
              </span>
              <span
                id="totalSentInvoice"
                className="invoice-col__status-number"
              >
                {sentInvoice !== null
                  ? sentInvoice.InvoiceList.filter(
                      (list) => list.InvoicState === 200
                    ).length
                  : sentInvoice === "0"}
              </span>
            </div>
            <NavLink to={"/sent-invoice"} className="invoice-col__link">
              {localization[current_lang].dashboard.Details}
              <span>
                <img src={arrowRight} alt="Arrow right" />
              </span>
            </NavLink>
          </div>

          <div className="invoice-col">
            <p className="invoice-col__title">
              {localization[current_lang].dashboard.ReceivedOrder}
            </p>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Pending}
              </span>
              <span
                id="pendingReceivedOrder"
                className="invoice-col__status-number"
              >
                {receivedOrder !== null
                  ? receivedOrder.OrderList.filter(
                      (list) => list.OrderState === 0
                    ).length
                  : receivedOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Processing}
              </span>
              <span
                id="processingReceivedOrder"
                className="invoice-col__status-number"
              >
                {receivedOrder !== null
                  ? receivedOrder.OrderList.filter(
                      (list) => list.OrderState === 100
                    ).length
                  : receivedOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Rejected}
              </span>
              <span
                id="unloadedReceivedOrder"
                className="invoice-col__status-number"
              >
                {receivedOrder !== null
                  ? receivedOrder.OrderList.filter(
                      (list) => list.OrderState === 300
                    ).length
                  : receivedOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Accepted}
              </span>
              <span
                id="acceptedReceivedOrder"
                className="invoice-col__status-number"
              >
                {receivedOrder !== null
                  ? receivedOrder.OrderList.filter(
                      (list) => list.OrderState === 200
                    ).length
                  : receivedOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span id="totalText" className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.All}
              </span>
              <span
                id="totalReceivedOrder"
                className="invoice-col__status-number"
              >
                {receivedOrder !== null
                  ? receivedOrder.OrderList.length
                  : receivedOrder === "0"}
              </span>
            </div>
            <NavLink to={"/received-order"} className="invoice-col__link">
              {localization[current_lang].dashboard.Details}
              <span>
                <img src={arrowRight} alt="Arrow right" />
              </span>
            </NavLink>
          </div>

          <div className="invoice-col">
            <p className="invoice-col__title">
              {localization[current_lang].dashboard.SentOrder}
            </p>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Pending}
              </span>
              <span
                id="pendingSentOrder"
                className="invoice-col__status-number"
              >
                {sentOrder !== null
                  ? sentOrder.OrderList.filter((list) => list.OrderState === 0)
                      .length
                  : sentOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Processing}
              </span>
              <span
                id="processingSentOrder"
                className="invoice-col__status-number"
              >
                {sentOrder !== null
                  ? sentOrder.OrderList.filter(
                      (list) => list.OrderState === 100
                    ).length
                  : sentOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Rejected}
              </span>
              <span
                id="unloadedSentOrder"
                className="invoice-col__status-number"
              >
                {sentOrder !== null
                  ? sentOrder.OrderList.filter(
                      (list) => list.OrderState === 300
                    ).length
                  : sentOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.Accepted}
              </span>
              <span
                id="acceptedSentOrder"
                className="invoice-col__status-number"
              >
                {sentOrder !== null
                  ? sentOrder.OrderList.filter((list) => list.OrderState === 0)
                      .length
                  : sentOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span id="totalText" className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.All}
              </span>
              <span id="totalSentOrder" className="invoice-col__status-number">
                {sentOrder !== null
                  ? sentOrder.OrderList.length
                  : sentOrder === "0"}
              </span>
            </div>
            <NavLink to={"/sent-order"} className="invoice-col__link">
              {localization[current_lang].dashboard.Details}
              <span>
                <img src={arrowRight} alt="Arrow right" />
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default EntryList;
