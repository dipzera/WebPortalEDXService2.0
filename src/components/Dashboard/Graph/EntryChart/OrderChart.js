import React, {useContext, useEffect, useState} from "react";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import { LayoutContext } from "../../../../layout/context";
import { DashboardContext } from "../../DashboardContext";
import { localization } from "../../../../util/localization";
import GraphSelect from "../GraphSelect";
import convertDateMilliseconds from "../../../../util/convertDateMilliseconds"
import useFetch from "../../../../hooks/useFetch"
import BarChartDataFilter from "./BarChartDataFilter"
import DoughnutChartFilter from "./DougnutChartFilter"

const OrderChart = () => {

  const { current_lang } = useContext(LayoutContext);
  const {
    receivedOrder,
    sentOrder,
    receivedOrderLoading,
    sentOrderLoading,
  } = useContext(DashboardContext);

  const receivedUrl =
    "https://api.edi.md/WebPortalEDXService/json/GetReceivedOrders?";
  const sentUrl =
    "https://api.edi.md/WebPortalEDXService/json/GetSentOrders?";


  const [active, setActive] = useState("invoiceReceivedBtn");

  const handleActiveClass = (id) => {
    setActive(id);
  }

  /* Doughnut chart filter */
  const [receivedEntryChart, sentEntryChart] = DoughnutChartFilter(
    receivedOrder,
    sentOrder,
    "OrderList",
    "OrderState"
  );

  /* Bar chart filter */
  const [
    processingRec,
    processingSent,
    pendingRec,
    pendingSent,
    acceptedRec,
    acceptedSent,
    rejectedRec,
    rejectedSent,
  ] = BarChartDataFilter("OrderList", "OrderState", receivedUrl, sentUrl);



  return (
    <>
      <div className={"graph order"}>
        <div className="graph__inner">
          <div className="graph-item">
            <GraphSelect
              entryType={localization[current_lang].chart.Order}
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

export default OrderChart;
