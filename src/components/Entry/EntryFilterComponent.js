import React, {useContext} from 'react';
import {localization} from "../../util/localization"
import arrowRight from "../../assets/images/arrow-right.svg"
import {LayoutContext} from "../../layout/context"

const EntryFilterComponent = ({getToday, getMonth, getWeek, getCustom, showDateInputs, handleFilterState, activeState, activeDate, setStartDateInput, setEndDateInput, startDateInput, endDateInput}) => {
  const { current_lang } = useContext(LayoutContext)
  return (
    <div className="filter">
      <div className="filter__inner">
        <div className="filter-item">
          <div className="filter-item__status">
            <ul className="filter-item__status-list">
              <li
                id="Total"
                data-status={"50"}
                className={
                  activeState == 50
                    ? "filter-item__status-list-btn active"
                    : "filter-item__status-list-btn"
                }
                onClick={(e) => {
                  return handleFilterState(e.currentTarget.dataset.status);
                }}
              >
                <a className="filter-item__status-text">
                  {localization[current_lang].invoice.filter.status.All}
                </a>
              </li>
              <li
                id="Pending"
                data-status={"0"}
                className={
                  activeState == 0
                    ? "filter-item__status-list-btn active"
                    : "filter-item__status-list-btn"
                }
                onClick={(e) => {
                  return handleFilterState(e.currentTarget.dataset.status);
                }}
              >
                <a className="filter-item__status-text">
                  {localization[current_lang].invoice.filter.status.Pending}
                </a>
              </li>
              <li
                id="Processing"
                data-status={"100"}
                className={
                  activeState == 100
                    ? "filter-item__status-list-btn active"
                    : "filter-item__status-list-btn"
                }
                onClick={(e) => {
                  handleFilterState(e.currentTarget.dataset.status);
                }}
              >
                <a className="filter-item__status-text">
                  {
                    localization[current_lang].invoice.filter.status
                      .Processing
                  }
                </a>
              </li>
              <li
                id="Rejected"
                data-status={"300"}
                className={
                  activeState == 300
                    ? "filter-item__status-list-btn active"
                    : "filter-item__status-list-btn"
                }
                onClick={(e) => {
                  return handleFilterState(e.currentTarget.dataset.status);
                }}
              >
                <a className="filter-item__status-text">
                  {localization[current_lang].invoice.filter.status.Rejected}
                </a>
              </li>
              <li
                data-status={"200"}
                className={
                  activeState == 200
                    ? "filter-item__status-list-btn active"
                    : "filter-item__status-list-btn"
                }
                onClick={(e) => {
                  return handleFilterState(e.currentTarget.dataset.status);
                }}
              >
                <a className="filter-item__status-text">
                  {localization[current_lang].invoice.filter.status.Accepted}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter-item">
          <div className="filter-item__time">
            <ul className="filter-item__time-list">
              <li
                id="day"
                className={
                  activeDate == 0
                    ? "filter-item__time-link active"
                    : "filter-item__time-link"
                }
                onClick={getToday}
              >
                <a className="filter-item__time-text">
                  {localization[current_lang].invoice.filter.date.Day}
                </a>
              </li>
              <li
                id="week"
                className={
                  activeDate == 1
                    ? "filter-item__time-link active"
                    : "filter-item__time-link"
                }
                onClick={getWeek}
              >
                <a className="filter-item__time-text">
                  {localization[current_lang].invoice.filter.date.Week}
                </a>
              </li>
              <li
                id="month"
                className={
                  activeDate == 2
                    ? "filter-item__time-link active"
                    : "filter-item__time-link"
                }
                onClick={getMonth}
              >
                <a className="filter-item__time-text">
                  {localization[current_lang].invoice.filter.date.Month}
                </a>
              </li>
              <li
                id="custom"
                className={
                  activeDate == 3
                    ? "filter-item__time-link active"
                    : "filter-item__time-link"
                }
                onClick={showDateInputs}
              >
                <a>{localization[current_lang].invoice.filter.date.Custom}</a>
              </li>
            </ul>
            <div className="filter-item__date active">
              <input
                className="filter-item__date-input"
                onChange={(e) =>
                  setStartDateInput(
                    e.target.value,
                    localStorage.setItem(
                      "startDateInput",
                      JSON.stringify(e.target.value)
                    )
                  )
                }
                name="start"
                id="start"
                // value={currentMonth[0].toString()}
                value={startDateInput}
                min="2000-01-01"
                max="2030-01-01"
                type="date"
              />
              <label htmlFor="start">
                {localization[current_lang].invoice.filter.date.To}
              </label>
              <input
                className="filter-item__date-input"
                onChange={(e) =>
                  setEndDateInput(
                    e.target.value,
                    localStorage.setItem(
                      "endDateInput",
                      JSON.stringify(e.target.value)
                    )
                  )
                }
                name="end"
                id="end"
                // value={currentMonth[1].toString()}
                value={endDateInput}
                min="2000-01-01"
                max="2030-01-01"
                type="date"
              />
              <button
                className="filter-item__time-link"
                id="customToggler"
                type="button"
                onClick={getCustom}
              >
                <img src={arrowRight} alt="Arrow right" width="15px" />
              </button>
            </div>
            <button
              className="balance-item__btn filter-item__time-link"
              type="button"
              id="customToggler"
              onClick={getCustom}
            >
              {localization[current_lang].search}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryFilterComponent;