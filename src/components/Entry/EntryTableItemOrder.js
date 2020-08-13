import React from "react";
import convertDate from "../../util/convertDate";
import { localization } from "../../util/localization";

const EntryTableItemOrder = ({ entryData, current_lang }) => {
  return (
    <div className="table__container invoice">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>{localization[current_lang].invoice.table.Date}</th>
            <th>{localization[current_lang].invoice.table.DeliveryDate}</th>
            <th>{localization[current_lang].invoice.table.SenderName}</th>
            <th>{localization[current_lang].invoice.table.State}</th>
          </tr>
        </thead>

        <tbody>
          {entryData.map((item) => (
            <tr className="table__row" key={item.Number}>
              <td>
                <span
                  className={"status"}
                  style={
                    item.OrderState == 0
                      ? { background: "#55d8fe" }
                      : item.OrderState == 100
                      ? { background: "#ffda83" }
                      : item.OrderState == 200
                      ? { background: "#5fe3a1" }
                      : { background: "#ff8373" }
                  }
                >
                  {item.Number}
                </span>
              </td>
              <td>{convertDate(item.Date)}</td>
              <td>{convertDate(item.DeliveryDate)}</td>
              <td>{item.IDNO_sender}</td>
              <td>
                {item.OrderState == 0
                  ? localization[current_lang].invoice.filter.status.Pending
                  : item.OrderState == 100
                  ? localization[current_lang].invoice.filter.status.Processing
                  : item.OrderState == 200
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

export default EntryTableItemOrder;
