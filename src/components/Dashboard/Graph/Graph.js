import React, { useContext } from "react";
import DoughnutChart from "./EntryChart/DoughnutChart";
import BarChart from "./EntryChart/BarChart";
import { LayoutContext } from "../../layout/context";
import { DashboardContext } from "./DashboardContext";
import GraphSelect from "./GraphSelect";
import { localization } from "../../util/localization";
import InvoiceChart from "./EntryChart/InvoiceChart";
import OrderChart from "./EntryChart/OrderChart";

const Graph = () => {


  return (
    <>
      <InvoiceChart />
      <OrderChart />
    </>
  );
};

export default Graph;
