import React, {useContext} from "react"
import {LayoutContext} from "../layout/context"
import useFilter from "../../hooks/useFilter"
import {localization} from "../../util/localization"
import arrowRight from "../../assets/images/arrow-right.svg"
import LoadingSpinner from "../Loading/LoadingSpinner"
import EntryTableItemOrder from "./EntryTableItemOrder"
import EntryTableItemInvoice from "./EntryTableItemInvoice"
import EntryFilterComponent from "./EntryFilterComponent"

export const SentOrder = () => {
  const {
    current_lang,
  } = useContext(LayoutContext);
  const fetchUrl =
    "http://api.efactura.md:4445/WebPortalEDXService/json/GetSentOrders?";
  const [
    getToday,
    getMonth,
    getWeek,
    getCustom,
    showDateInputs,
    invoice,
    handleFilterState,
    activeState,
    activeDate,
    setStartDateInput,
    startDateInput,
    setEndDateInput,
    endDateInput,
    isLoading,
    error,
  ] = useFilter(fetchUrl, "OrderList", "OrderState");

  const entryInvoice = false

  return (
    <>
      <EntryFilterComponent
        getToday={getToday}
        getMonth={getMonth}
        getWeek={getWeek}
        getCustom={getCustom}
        showDateInputs={showDateInputs}
        handleFilterState={handleFilterState}
        activeState={activeState}
        activeDate={activeDate}
        setStartDateInput={setStartDateInput}
        setEndDateInput={setEndDateInput}
        startDateInput={startDateInput}
        endDateInput={endDateInput}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {entryInvoice ? (
            <EntryTableItemInvoice
              entryData={invoice}
              current_lang={current_lang}
            />
          ) : (
            <EntryTableItemOrder
              entryData={invoice}
              current_lang={current_lang}
            />
          )}
        </>
      )}
    </>
  );
}