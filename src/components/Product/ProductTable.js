import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../layout/context";
import { localization } from "../../util/localization";
import { ProductContext } from "./context"

const ProductTable = () => {
  const { current_lang } = useContext(LayoutContext);

  const { data, listData, entry } = useContext(ProductContext);

  return (
    <>
      {entry === "/received-invoice" || entry === "/sent-invoice" ? (
        <div className={"product-container"}>
          <table>
            <thead>
              <tr>
                <th className="column1">
                  {localization[current_lang].product.table.Name}
                </th>
                <th className="column2">
                  {localization[current_lang].product.table.Quantity}
                </th>
                <th className="column3">
                  {localization[current_lang].product.table.PriceNet}
                </th>
                <th className="column4">
                  {localization[current_lang].product.table.SumNet}
                </th>
                <th className="column5">
                  {localization[current_lang].product.table.VAT}
                </th>
                <th className="column6">
                  {localization[current_lang].product.table.TotalVAT}
                </th>
                <th className="column7">
                  {localization[current_lang].product.table.TotalSUM}
                </th>
              </tr>
            </thead>
            <tbody>
              {listData &&
                listData.map((list) => (
                  <tr key={list.Code}>
                    <td className="column1">{list.Name}</td>
                    <td className="column2">{list.Quantity}</td>
                    <td className="column3 numspan">
                      {list.PriceNet.toFixed(2)}
                    </td>
                    <td className="column4 numspan">
                      {list.TotalSumNet.toFixed(2)}
                    </td>
                    <td className="column5">{list.VATPercent}%</td>
                    <td className="column6 numspan">
                      {list.TotalVAT.toFixed(2)}
                    </td>
                    <td className="column7 numspan">
                      <strong>{list.TotalSum}</strong>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        // ORDER
        <div className={"product-container"}>
          <table>
            <thead>
              <tr>
                <th className="column1">Denumire</th>
                <th className="column2">Cantitate</th>
                <th className="column3">Pret</th>
                <th className="column4">Cod</th>
              </tr>
            </thead>
            <tbody>
              {listData &&
                listData.map((list) => (
                  <tr key={list.Code}>
                    <td className="column1">{list.Name}</td>
                    <td className="column2">{list.Quantity}</td>
                    <td className="column3 numspan">{list.Price}</td>
                    <td className="column5">{list.Code}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProductTable;
