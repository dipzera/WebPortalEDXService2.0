import useFetch from "../../../hooks/useFetch"
import {useEffect, useState} from "react"
import convertDateMilliseconds from "../../../util/convertDateMilliseconds"

export default function BarChartDataFilter(entryType, entryState, receivedUrl, sentUrl) {
  const handleFilter = (entry, entryState, stateId) => {
    if (entry !== null) {
      return entry.filter((item) => item[entryState] === stateId).length;
    }
  };
  let curr = new Date();
  let week = [];
  for (let i = 0; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }

  const milliseconds1 = new Date(week[0]).getTime() - 10800000;
  const milliseconds2 = new Date(week[1]).getTime()- 10800000;
  const milliseconds3 = new Date(week[2]).getTime()- 10800000;
  const milliseconds4 = new Date(week[3]).getTime()- 10800000;
  const milliseconds5 = new Date(week[4]).getTime()- 10800000;
  const milliseconds6 = new Date(week[5]).getTime()- 10800000;
  const milliseconds7 = new Date(week[6]).getTime()- 10800000;


  const params = {
    TKey: JSON.parse(localStorage.getItem("Token")),
    DStart: week[0],
    DEnd: week[6],
  };

  const { response: receivedOrderData } = useFetch({
    method: "get",
    url:
      receivedUrl +
      params.toString(),
  });

  const { response: sentOrderData } = useFetch({
    method: "get",
    url:
      sentUrl +
      params.toString(),
  });

  const [d1, setD1] = useState([]);
  const [d2, setD2] = useState([]);
  const [d3, setD3] = useState([]);
  const [d4, setD4] = useState([]);
  const [d5, setD5] = useState([]);
  const [d6, setD6] = useState([]);
  const [f1, setF1] = useState([]);
  const [f2, setF2] = useState([]);
  const [f3, setF3] = useState([]);
  const [f4, setF4] = useState([]);
  const [f5, setF5] = useState([]);
  const [f6, setF6] = useState([]);

  useEffect(() => {
    if (receivedOrderData !== null && sentOrderData && null) {
      setD1(
        receivedOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds2 &&
            convertDateMilliseconds(date.Date) >= milliseconds1
        )
      );
      setD2(
        receivedOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds3 &&
            convertDateMilliseconds(date.Date) >= milliseconds2
        )
      );
      setD3(
        receivedOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds4 &&
            convertDateMilliseconds(date.Date) >= milliseconds3
        )
      );
      setD4(
        receivedOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds5 &&
            convertDateMilliseconds(date.Date) >= milliseconds4
        )
      );

      setD5(
        receivedOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds6 &&
            convertDateMilliseconds(date.Date) >= milliseconds5
        )
      );
      setD6(
        receivedOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds7 &&
            convertDateMilliseconds(date.Date) >= milliseconds6
        )
      );

      setF1(
        sentOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds2 &&
            convertDateMilliseconds(date.Date) >= milliseconds1
        )
      );
      setF2(
        sentOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds3 &&
            convertDateMilliseconds(date.Date) >= milliseconds2
        )
      );
      setF3(
        sentOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds4 &&
            convertDateMilliseconds(date.Date) >= milliseconds3
        )
      );
      setF4(
        sentOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds5 &&
            convertDateMilliseconds(date.Date) >= milliseconds4
        )
      );

      setF5(
        sentOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds6 &&
            convertDateMilliseconds(date.Date) >= milliseconds5
        )
      );
      setF6(
        sentOrderData[entryType].filter(
          (date) =>
            convertDateMilliseconds(date.Date) < milliseconds7 &&
            convertDateMilliseconds(date.Date) >= milliseconds6
        )
      );
    }
  }, [receivedOrderData, sentOrderData]);


  const pendingRec = [
    handleFilter(d1, entryState, 0),
    handleFilter(d2, entryState, 0),
    handleFilter(d3, entryState, 0),
    handleFilter(d4, entryState, 0),
    handleFilter(d5, entryState, 0),
    handleFilter(d6, entryState, 0),
  ];
  const processingRec = [
    handleFilter(d1, entryState, 100),
    handleFilter(d2, entryState, 100),
    handleFilter(d3, entryState, 100),
    handleFilter(d4, entryState, 100),
    handleFilter(d5, entryState, 100),
    handleFilter(d6, entryState, 100),
  ];
  const acceptedRec = [
    handleFilter(d1, entryState, 200),
    handleFilter(d2, entryState, 200),
    handleFilter(d3, entryState, 200),
    handleFilter(d4, entryState, 200),
    handleFilter(d5, entryState, 200),
    handleFilter(d6, entryState, 200),
  ];
  const rejectedRec = [
    handleFilter(d1, entryState, 300),
    handleFilter(d2, entryState, 300),
    handleFilter(d3, entryState, 300),
    handleFilter(d4, entryState, 300),
    handleFilter(d5, entryState, 300),
    handleFilter(d6, entryState, 300),
  ];

  const pendingSent = [
    handleFilter(f1, entryState, 0),
    handleFilter(f2, entryState, 0),
    handleFilter(f3, entryState, 0),
    handleFilter(f4, entryState, 0),
    handleFilter(f5, entryState, 0),
    handleFilter(f6, entryState, 0),
  ];
  const processingSent = [
    handleFilter(f1, entryState, 100),
    handleFilter(f2, entryState, 100),
    handleFilter(f3, entryState, 100),
    handleFilter(f4, entryState, 100),
    handleFilter(f5, entryState, 100),
    handleFilter(f6, entryState, 100),
  ];
  const acceptedSent = [
    handleFilter(f1, entryState, 200),
    handleFilter(f2, entryState, 200),
    handleFilter(f3, entryState, 200),
    handleFilter(f4, entryState, 200),
    handleFilter(f5, entryState, 200),
    handleFilter(f6, entryState, 200),
  ];
  const rejectedSent = [
    handleFilter(f1, entryState, 300),
    handleFilter(f2, entryState, 300),
    handleFilter(f3, entryState, 300),
    handleFilter(f4, entryState, 300),
    handleFilter(f5, entryState, 300),
    handleFilter(f6, entryState, 300),
  ]
  return [processingRec, processingSent, pendingRec, pendingSent, acceptedRec, acceptedSent, rejectedRec, rejectedSent]
}
