import React, { useContext, useState } from "react";
import { localization } from "../../util/localization";
import { LayoutContext } from "../../layout/context";

// when I press the select entry button, I'm supposed to change the state and update the chart data
// prolly supposed to save it in a state or context
// so if the button is active change state & update data

const GraphSelect = ({ entryType }) => {
  const { current_lang } = useContext(LayoutContext);
  const [active, setActive] = useState("invoiceReceivedBtn");

  const handleActiveClass = (id) => {
    setActive(id);
    console.log(id)
  };

  return (
    <div className="graph-item__select">
      <p className="graph-item__select-title">{entryType}</p>
      <div className="graph-item__select-options">
        <button
          className={active === 'invoiceReceivedBtn' ? 'invoice-btns active' : 'invoice-btns'}
          id="invoiceReceivedBtn"
          type="button"
          onClick={(e) => handleActiveClass(e.currentTarget.id)}
        >
          {localization[current_lang].chart.Received}
        </button>
        <button
          className={active === 'invoiceSentBtn' ? 'invoice-btns active' : 'invoice-btns'}
          id="invoiceSentBtn"
          type="button"
          onClick={(e) => handleActiveClass(e.currentTarget.id)}
        >
          {localization[current_lang].chart.Sent}
        </button>
      </div>
    </div>
  );
};

export default GraphSelect;
