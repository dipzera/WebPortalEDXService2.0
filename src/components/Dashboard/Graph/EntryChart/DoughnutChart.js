import React, {Component, useContext, useEffect, useRef, useState} from "react";
import { Doughnut } from "react-chartjs-2";
import { DashboardContext } from "../DashboardContext";
import {localization} from "../../../util/localization"
import {LayoutContext} from "../../../layout/context"
import GraphSelect from "../Graph/GraphSelect"

const DoughnutChart = ({ receivedEntryData, sentEntryData, active }) => {


  let chartReference = {}

  const chartData = {
    labels: ["Pending", "Processing", "Rejected", "Accepted"],
    datasets: [
      {
        label: "Points",
        backgroundColor: ["#55D8FE", "#FFDA83", "#FF8373", "#5FE3A1"],
        data: receivedEntryData,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      animateScale: false
    },
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        padding: 20,
        usePointStyle: true
      }
    },
    // plugins: {
    //   // TODO: add possibility to show number of total data in center with doughnut label package (chartjs-plugin-doughnutlabel)
    // }
  }

  useEffect(() => {
    const chart = chartReference.chartInstance
    const chartConfig = chartReference.chartInstance.config.data
    if (active === 'invoiceReceivedBtn') {
      chartConfig.datasets[0].data = receivedEntryData
      chart.update()
    } else if (active === 'invoiceSentBtn') {
      chartConfig.datasets[0].data = sentEntryData
      chart.update()
    }
  }, [active])

  return (
    <div>
      <Doughnut
        ref={(reference) => chartReference = reference}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default DoughnutChart;
