import React, {useContext, useEffect, useState} from "react";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import { LayoutContext } from "../../../layout/context";
import { DashboardContext } from "../DashboardContext";
import { localization } from "../../../util/localization";
import GraphSelect from "../Graph/GraphSelect";
import convertDateMilliseconds from "../../../util/convertDateMilliseconds"
import useFetch from "../../../hooks/useFetch"
import BarChartDataFilter from "./BarChartDataFilter"

const OrderChart = () => {

  const { current_lang } = useContext(LayoutContext);
  const {
    receivedOrder,
    sentOrder,
    receivedOrderLoading,
    sentOrderLoading,
    handleEntryFilterByLength,
  } = useContext(DashboardContext);

  const receivedUrl =
    "http://api.efactura.md:4445/WebPortalEDXService/json/GetReceivedOrders?";
  const sentUrl =
    "http://api.efactura.md:4445/WebPortalEDXService/json/GetSentOrders?";

  const receivedOrderChart = [
    handleEntryFilterByLength(receivedOrder, "OrderList", "OrderState", 0),
    handleEntryFilterByLength(receivedOrder, "OrderList", "OrderState", 100),
    handleEntryFilterByLength(receivedOrder, "OrderList", "OrderState", 300),
    handleEntryFilterByLength(receivedOrder, "OrderList", "OrderState", 200),
  ];
  const sentOrderChart = [
    handleEntryFilterByLength(sentOrder, "OrderList", "OrderState", 0),
    handleEntryFilterByLength(sentOrder, "OrderList", "OrderState", 100),
    handleEntryFilterByLength(sentOrder, "OrderList", "OrderState", 300),
    handleEntryFilterByLength(sentOrder, "OrderList", "OrderState", 200),
  ];

  const [active, setActive] = useState("invoiceReceivedBtn");

  const handleActiveClass = (id) => {
    setActive(id);
  }


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
              receivedEntryData={receivedOrderChart}
              sentEntryData={sentOrderChart}
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
