import React from "react";
import { localization } from "../../util/localization";
import { NavLink } from "react-router-dom";
import arrowRight from "../../assets/images/arrow-right.svg";

const LoadingEntryList = () => {
  return (
    <div className="dashboard__invoice loading" id="bigScreen">
      <div className="invoice-col">
        <p className="invoice-col__title">
        </p>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="pendingReceivedInvoice"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="processingReceivedInvoice"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="unloadedReceivedInvoice"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="acceptedReceivedInvoice"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span id="totalText" className="invoice-col__status-text">
          </span>
          <span
            id="totalReceivedInvoice"
            className="invoice-col__status-number"
          >

          </span>
        </div>
      </div>

      <div className="invoice-col">
        <p className="invoice-col__title">
        </p>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span id="pendingSentInvoice" className="invoice-col__status-number">

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="processingSentInvoice"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span id="unloadedSentInvoice" className="invoice-col__status-number">

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span id="acceptedSentInvoice" className="invoice-col__status-number">

          </span>
        </div>
        <div className="invoice-col__status">
          <span id="totalText" className="invoice-col__status-text">
          </span>
          <span id="totalSentInvoice" className="invoice-col__status-number">

          </span>
        </div>
      </div>

      <div className="invoice-col">
        <p className="invoice-col__title">
        </p>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="pendingReceivedOrder"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="processingReceivedOrder"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="unloadedReceivedOrder"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span
            id="acceptedReceivedOrder"
            className="invoice-col__status-number"
          >

          </span>
        </div>
        <div className="invoice-col__status">
          <span id="totalText" className="invoice-col__status-text">
          </span>
          <span id="totalReceivedOrder" className="invoice-col__status-number">

          </span>
        </div>
      </div>

      <div className="invoice-col">
        <p className="invoice-col__title">
        </p>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span id="pendingSentOrder" className="invoice-col__status-number">

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span id="processingSentOrder" className="invoice-col__status-number">

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span id="unloadedSentOrder" className="invoice-col__status-number">

          </span>
        </div>
        <div className="invoice-col__status">
          <span className="invoice-col__status-text">
          </span>
          <span id="acceptedSentOrder" className="invoice-col__status-number">

          </span>
        </div>
        <div className="invoice-col__status">
          <span id="totalText" className="invoice-col__status-text">
          </span>
          <span id="totalSentOrder" className="invoice-col__status-number">

          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingEntryList;
