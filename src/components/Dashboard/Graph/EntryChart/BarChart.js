import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DashboardContext } from "../../DashboardContext";
import useFetch from "../../../../hooks/useFetch";
import convertDateMilliseconds from "../../../../util/convertDateMilliseconds";
import { localization } from "../../../../util/localization";
import AuthLayout from "../../../../layout/AuthLayout";
import { LayoutContext } from "../../../../layout/context";

const BarChart = ({
  pendingRec,
  processingRec,
  rejectedRec,
  acceptedRec,
  pendingSent,
  processingSent,
  rejectedSent,
  acceptedSent,
  active,
}) => {
  const { current_lang } = useContext(LayoutContext);

  const chartData = {
    labels: [
      localization[current_lang].chart.date.Monday,
      localization[current_lang].chart.date.Tuesday,
      localization[current_lang].chart.date.Wednesday,
      localization[current_lang].chart.date.Thursday,
      localization[current_lang].chart.date.Friday,
      localization[current_lang].chart.date.Saturday,
    ],
    datasets: [
      {
        label: "Pending",
        backgroundColor: "#55D8FE",
        data: pendingRec,
      },
      {
        label: "Processing",
        backgroundColor: "#FFDA83",
        data: processingRec,
      },
      {
        label: "Rejected",
        backgroundColor: "#FF8373",
        data: rejectedRec,
      },
      {
        label: "Accepted",
        backgroundColor: "#5FE3A1",
        data: acceptedRec,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    barRoundness: 0.3,
    barValueSpacing: 20,
    scales: {
      yAxes: [
        {
          gridLines: {
            offsetGridLines: true,
            display: false,
          },
          ticks: {
            min: 0,
            padding: 0,
          },
        },
      ],
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
  };

  let chartReference = {};
  useEffect(() => {
    const chart = chartReference.chartInstance;
    const chartConfig = chartReference.chartInstance.config.data;
    if (active === "invoiceReceivedBtn") {

      chartConfig.datasets[0].data = pendingRec;
      chartConfig.datasets[1].data = processingRec;
      chartConfig.datasets[2].data = rejectedRec;
      chartConfig.datasets[3].data = acceptedRec;
      chart.update();
    } else if (active === "invoiceSentBtn") {
      chartConfig.datasets[0].data = pendingSent;
      chartConfig.datasets[1].data = processingSent;
      chartConfig.datasets[2].data = rejectedSent;
      chartConfig.datasets[3].data = acceptedSent;
      chart.update();
    }
  }, [active]);

  return (
    <div>
      <Bar
        data={chartData}
        options={chartOptions}
        ref={(reference) => (chartReference = reference)}
      />
    </div>
  );
};

export default BarChart;
