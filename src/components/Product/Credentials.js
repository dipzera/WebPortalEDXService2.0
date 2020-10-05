import React, { useContext, useEffect, useState } from "react";
import { localization } from "../../util/localization";
import { LayoutContext } from "../../layout/context";
import { ProductContext } from "./context";
import convertDate from "../../util/convertDate"

const Credentials = () => {
  const { current_lang } = useContext(LayoutContext);

  const { data } = useContext(ProductContext);

  return (
    <div className="credentials">
      <div className="credentials-col">
        <dl className="credentials-col__info">
          <dt>{localization[current_lang].product.header.SenderName}:</dt>
          <dd id="SenderName">{data.SenderName}</dd>
        </dl>
        <dl className="credentials-col__info">
          <dt>{localization[current_lang].product.header.DeliveryDate}:</dt>
          <dd id="DeliveryDate">{convertDate(data.DeliveryDate)}</dd>
        </dl>
      </div>

      <div className="credentials-col">
        <dl className="credentials-col__info">
          <dt>{localization[current_lang].product.header.Number}:</dt>
          <dd id="Number">{data.Number}</dd>
        </dl>
        <dl className="credentials-col__info">
          <dt>{localization[current_lang].product.header.Date}:</dt>
          <dd id="Date">{convertDate(data.Date)}</dd>
        </dl>
      </div>
    </div>
  );
};

export default Credentials;
