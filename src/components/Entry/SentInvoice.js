import React, {useContext} from "react"
import {LayoutContext} from "../../layout/context"
import {localization} from "../../util/localization"
import arrowRight from "../../assets/images/arrow-right.svg"
import LoadingSpinner from "../Loading/LoadingSpinner"
import EntryTableItemInvoice from "./EntryTableItemInvoice"
import useFilter from "../../hooks/useFilter"
import EntryTableItemOrder from "./EntryTableItemOrder"
import EntryFilterComponent from "./EntryFilterComponent"

export const SentInvoice = ({history}) => {
  const {
    current_lang,
  } = useContext(LayoutContext);
  const fetchUrl =
    "https://api.edi.md/WebPortalEDXService/json/GetSentInvoiceList?";
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
  ] = useFilter(fetchUrl, "InvoiceList", "InvoicState");

  const entryInvoice = true

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
              history={history}
            />
          ) : (
            <EntryTableItemOrder
              entryData={invoice}
              current_lang={current_lang}
              history={history}

            />
          )}
        </>
      )}
    </>
  );
}