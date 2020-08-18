import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../../layout/context";
import { DashboardContext } from "../DashboardContext";
import GraphSelect from "../Graph/GraphSelect";
import { localization } from "../../../util/localization";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import useFetch from "../../../hooks/useFetch";
import convertDateMilliseconds from "../../../util/convertDateMilliseconds";
import BarChartDataFilter from "./BarChartDataFilter";

const InvoiceChart = () => {
  const { current_lang } = useContext(LayoutContext);

  const receivedUrl =
    "http://api.efactura.md:4445/WebPortalEDXService/json/GetReceivedInvoiceList?";
  const sentUrl =
    "http://api.efactura.md:4445/WebPortalEDXService/json/GetSentInvoiceList?";

  const {
    receivedInvoice,
    sentInvoice,
    receivedInvoiceLoading,
    sentInvoiceLoading,
    handleEntryFilterByLength,
  } = useContext(DashboardContext);

  const receivedInvoiceChart = [
    handleEntryFilterByLength(receivedInvoice, "InvoiceList", "InvoicState", 0),
    handleEntryFilterByLength(
      receivedInvoice,
      "InvoiceList",
      "InvoicState",
      100
    ),
    handleEntryFilterByLength(
      receivedInvoice,
      "InvoiceList",
      "InvoicState",
      300
    ),
    handleEntryFilterByLength(
      receivedInvoice,
      "InvoiceList",
      "InvoicState",
      200
    ),
  ];

  const sentInvoiceChart = [
    handleEntryFilterByLength(sentInvoice, "InvoiceList", "InvoicState", 0),
    handleEntryFilterByLength(sentInvoice, "InvoiceList", "InvoicState", 100),
    handleEntryFilterByLength(sentInvoice, "InvoiceList", "InvoicState", 300),
    handleEntryFilterByLength(sentInvoice, "InvoiceList", "InvoicState", 200),
  ];

  const [active, setActive] = useState("invoiceReceivedBtn");

  const handleActiveClass = (id) => {
    setActive(id);
  };

  /* BAR CHART Filter */
  const [
    processingRec,
    processingSent,
    pendingRec,
    pendingSent,
    acceptedRec,
    acceptedSent,
    rejectedRec,
    rejectedSent,
  ] = BarChartDataFilter("InvoiceList", "InvoicState", receivedUrl, sentUrl);

  return (
    <>
      <div className={"graph invoice"}>
        <div className="graph__inner">
          <div className="graph-item">
            <GraphSelect
              entryType={localization[current_lang].chart.Invoice}
              active={active}
              handleActiveClass={handleActiveClass}
            />
            <DoughnutChart
              receivedEntryData={receivedInvoiceChart}
              sentEntryData={sentInvoiceChart}
              active={active}
            />
          </div>
          <div className="graph-item">
            <BarChart
              active={active}
              pendingRec={pendingRec}
              pendingSent={pendingSent}
              processingRec={processingRec}
              processingSent={processingSent}
              rejectedRec={rejectedRec}
              rejectedSent={rejectedSent}
              acceptedRec={acceptedRec}
              acceptedSent={acceptedSent}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceChart;
