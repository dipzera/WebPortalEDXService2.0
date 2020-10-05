import {useContext} from "react"
import {DashboardContext} from "../../DashboardContext"

export default function DoughnutChartFilter(receivedEntry, sentEntry, entryType, entryState) {
  const {
    handleEntryFilterByLength,
  } = useContext(DashboardContext);

  const receivedEntryChart = [
    handleEntryFilterByLength(receivedEntry, entryType, entryState, 0),
    handleEntryFilterByLength(
      receivedEntry,
      entryType,
      entryState,
      100
    ),
    handleEntryFilterByLength(
      receivedEntry,
      entryType,
      entryState,
      300
    ),
    handleEntryFilterByLength(
      receivedEntry,
      entryType,
      entryState,
      200
    ),
  ];

  const sentEntryChart = [
    handleEntryFilterByLength(sentEntry, entryType, entryState, 0),
    handleEntryFilterByLength(sentEntry, entryType, entryState, 100),
    handleEntryFilterByLength(sentEntry, entryType, entryState, 300),
    handleEntryFilterByLength(sentEntry, entryType, entryState, 200),
  ];
  return [receivedEntryChart, sentEntryChart]
}