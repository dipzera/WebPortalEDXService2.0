import React, { useContext, useEffect, useState } from "react"
import arrowRight from "../../assets/images/arrow-right.svg"
import { localization } from "../../util/localization"
import { NavLink, useHistory } from "react-router-dom"
import getCurrentMonth from "../../util/getCurrentMonth"
import axios from "axios"
import useFetch from "../../hooks/useFetch"
import { LayoutContext } from "../../layout/context"
import LoadingSpinner from "../Loading/LoadingSpinner"
import LoadingEntryList from "../Loading/LoadingEntryList"
import { DashboardContext } from "./DashboardContext"

const EntryList = ({ history }) => {
  const currentMonth = getCurrentMonth()

  const { current_lang } = useContext(LayoutContext)

  const {
    receivedInvoice,
    receivedOrder,
    sentInvoice,
    sentOrder,
    receivedInvoiceLoading,
    receivedOrderLoading,
    sentInvoiceLoading,
    sentOrderLoading,
    handleEntryFilterByLength,
  } = useContext(DashboardContext)

  return (
    <>
      {receivedInvoiceLoading &&
      sentInvoiceLoading &&
      receivedOrderLoading &&
      sentOrderLoading ? (
        <LoadingEntryList />
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
                  ? handleEntryFilterByLength(
                      receivedInvoice,
                      "InvoiceList",
                      "InvoicState",
                      0
                    )
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
                  ? handleEntryFilterByLength(
                      receivedInvoice,
                      "InvoiceList",
                      "InvoicState",
                      100
                    )
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
                {receivedInvoice !== null
                  ? handleEntryFilterByLength(
                      receivedInvoice,
                      "InvoiceList",
                      "InvoicState",
                      300
                    )
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
                  ? handleEntryFilterByLength(
                      receivedInvoice,
                      "InvoiceList",
                      "InvoicState",
                      200
                    )
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
                  ? handleEntryFilterByLength(
                      receivedInvoice,
                      "InvoiceList",
                      "InvoicState",
                      0,
                      true
                    )
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
                  ? handleEntryFilterByLength(
                      sentInvoice,
                      "InvoiceList",
                      "InvoicState",
                      0
                    )
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
                  ? handleEntryFilterByLength(
                      sentInvoice,
                      "InvoiceList",
                      "InvoicState",
                      100
                    )
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
                  ? handleEntryFilterByLength(
                      sentInvoice,
                      "InvoiceList",
                      "InvoicState",
                      300
                    )
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
                  ? handleEntryFilterByLength(
                      sentInvoice,
                      "InvoiceList",
                      "InvoicState",
                      200
                    )
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
                  ? handleEntryFilterByLength(
                      sentInvoice,
                      "InvoiceList",
                      "InvoicState",
                      0,
                      true
                    )
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
                  ? handleEntryFilterByLength(
                      receivedOrder,
                      "OrderList",
                      "OrderState",
                      0
                    )
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
                  ? handleEntryFilterByLength(
                      receivedOrder,
                      "OrderList",
                      "OrderState",
                      100
                    )
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
                  ? handleEntryFilterByLength(
                      receivedOrder,
                      "OrderList",
                      "OrderState",
                      300
                    )
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
                  ? handleEntryFilterByLength(
                      receivedOrder,
                      "OrderList",
                      "OrderState",
                      200
                    )
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
                  ? handleEntryFilterByLength(
                      receivedOrder,
                      "OrderList",
                      "OrderState",
                      0,
                      true
                    )
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
                  ? handleEntryFilterByLength(
                      sentOrder,
                      "OrderList",
                      "OrderState",
                      0
                    )
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
                  ? handleEntryFilterByLength(
                      sentOrder,
                      "OrderList",
                      "OrderState",
                      100
                    )
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
                  ? handleEntryFilterByLength(
                      sentOrder,
                      "OrderList",
                      "OrderState",
                      300
                    )
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
                  ? handleEntryFilterByLength(
                      sentOrder,
                      "OrderList",
                      "OrderState",
                      200
                    )
                  : sentOrder === "0"}
              </span>
            </div>
            <div className="invoice-col__status">
              <span id="totalText" className="invoice-col__status-text">
                {localization[current_lang].invoice.filter.status.All}
              </span>
              <span id="totalSentOrder" className="invoice-col__status-number">
                {sentOrder !== null
                  ? handleEntryFilterByLength(
                      sentOrder,
                      "OrderList",
                      "OrderState",
                      0,
                      true
                    )
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
  )
}

export default EntryList
