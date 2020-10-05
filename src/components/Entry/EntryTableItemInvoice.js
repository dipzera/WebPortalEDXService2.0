import React from "react";
import convertDateWithHour from "../../util/convertDateWithHour";
import clock from "../../assets/images/clock.svg";
import convertDate from "../../util/convertDate";
import { localization } from "../../util/localization";
import {useHistory } from 'react-router-dom'

const EntryTableItemInvoice = ({ entryData, current_lang, history }) => {

  const handleNavigation = (data) => {
    const location = window.location.pathname;
    history.push({
      pathname: `${location}/product`,
      data: data,
      currentEntry: location
    })
  }
  return (
    <div className="table__container invoice">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>{localization[current_lang].invoice.table.CreateDate}</th>
            <th>{localization[current_lang].invoice.table.Date}</th>
            <th>{localization[current_lang].invoice.table.DeliveryDate}</th>
            <th>{localization[current_lang].invoice.table.SenderName}</th>
            <th>{localization[current_lang].invoice.table.State}</th>
          </tr>
        </thead>
        <tbody>
          {entryData.map((item) => (
            <tr className="table__row" key={item.Number} onClick={() => handleNavigation(item)}>
              <td>
                <span
                  className={"status"}
                  style={
                    item.InvoicState == 0
                      ? { background: "#55d8fe" }
                      : item.InvoicState == 100
                      ? { background: "#ffda83" }
                      : item.InvoicState == 200
                      ? { background: "#5fe3a1" }
                      : { background: "#ff8373" }
                  }
                >
                  {item.Number}
                </span>
              </td>
              <td className="date">
                {convertDateWithHour(item.CreateDate).split(" ")[0]}
                <span className="hour">
                  <img src={clock} alt="Clock" />
                  {convertDateWithHour(item.CreateDate).split(" ")[1]}
                </span>
              </td>
              <td>{convertDate(item.Date)}</td>
              <td>{convertDate(item.DeliveryDate)}</td>
              <td>{item.SenderName}</td>
              <td>
                {item.InvoicState == 0
                  ? localization[current_lang].invoice.filter.status.Pending
                  : item.InvoicState == 100
                  ? localization[current_lang].invoice.filter.status.Processing
                  : item.InvoicState == 200
                  ? localization[current_lang].invoice.filter.status.Accepted
                  : localization[current_lang].invoice.filter.status.Rejected}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntryTableItemInvoice;
