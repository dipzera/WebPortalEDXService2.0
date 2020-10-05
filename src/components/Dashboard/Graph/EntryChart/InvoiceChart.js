import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../../../layout/context";
import { DashboardContext } from "../../DashboardContext";
import GraphSelect from "../GraphSelect";
import { localization } from "../../../../util/localization";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import useFetch from "../../../../hooks/useFetch";
import convertDateMilliseconds from "../../../../util/convertDateMilliseconds";
import BarChartDataFilter from "./BarChartDataFilter";
import DoughnutChartFilter from "./DougnutChartFilter";

const InvoiceChart = () => {
  const { current_lang } = useContext(LayoutContext);

  const receivedUrl =
    "https://api.edi.md/WebPortalEDXService/json/GetReceivedInvoiceList?";
  const sentUrl =
    "https://api.edi.md/WebPortalEDXService/json/GetSentInvoiceList?";

  const { receivedInvoice, sentInvoice } = useContext(DashboardContext);

  const [active, setActive] = useState("invoiceReceivedBtn");

  const handleActiveClass = (id) => {
    setActive(id);
  };

  /* Doughnut chart Filter */
  const [receivedEntryChart, sentEntryChart] = DoughnutChartFilter(
    receivedInvoice,
    sentInvoice,
    "InvoiceList",
    "InvoicState"
  );

  /* BAR CHART Filter */
  const [
    pendingRec,
    processingRec,
    rejectedRec,
    acceptedRec,
    pendingSent,
    processingSent,
    rejectedSent,
    acceptedSent,
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
              receivedEntryData={receivedEntryChart}
              sentEntryData={sentEntryChart}
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
