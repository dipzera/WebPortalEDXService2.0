import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useHistory } from "react-router-dom";
import ProductTable from "./ProductTable";
import { localization } from "../../util/localization";
import { LayoutContext } from "../../layout/context";
import Credentials from "./Credentials";
import arrowLeft from "../../assets/images/arrow-left.svg";
import { ProductContext } from "./context";
import ProductModal from "./ProductModal"
import axios from 'axios'

const Product = ({ history, location, match }) => {
  const { current_lang } = useContext(LayoutContext);
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [entry, setEntry] = useState("");

  useEffect(() => {
    try {
      setData(location.data);
      setListData(location.data["Lines"]);
      setEntry(location.currentEntry);
    } catch {
      history.push(entry);
    }
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [textarea, setTextarea] = useState('')

  const handleEntryConfirm = (stateId) => {
    if (entry === '/received-invoice' || entry === '/sent-invoice') {
      axios.get('https://api.edi.md/WebPortalEDXService/json/SetInvoiceState?', {
        params: {
          APIKey: JSON.parse(localStorage.getItem('Token')),
          InvoiceID: location.data && location.data.InvoicID,
          State: stateId,
          Note: textarea || stateId === 200 && ''
        }
      })
        .then(res => {
          if (res.data.ErrorCode === 0) {
            history.push(entry)
          } else {
            alert('Error')
          }
        })
    } else {
      axios.get('https://api.edi.md/WebPortalEDXService/json/SetOrderState?', {
        params: {
          APIKey: JSON.parse(localStorage.getItem('Token')),
          OrderCode: location.data && location.data.Number, // FIXME: not clear yet, is it Number or Code
          State: stateId,
          Note: textarea || stateId === 200 && ''
        }
      })
        .then(res => {
          if (res.data.ErrorCode === 0) {
            history.push(entry)
          } else {
            alert('Error')
          }
        })
    }
  };

  return (
    <ProductContext.Provider
      value={{
        data,
        listData,
        entry,
      }}
    >
      <div className={"product-buttons"}>
        <Link className="product__btn-back" id="goBack" to={entry}>
          <span>
            <img src={arrowLeft} alt="Arrow left" />
          </span>
          <span>{localization[current_lang].product.header.BackButton}</span>
        </Link>
        {data["InvoicState"] === 0 || data["OrderState"] === 0 && (
          <div className="product-buttons__confirmation">
            <button className="product__btn  accept" id="acceptBtn" onClick={() => handleEntryConfirm(200)}>
              {localization[current_lang].product.header.AcceptButton}
            </button>
            <button className="product__btn  deny" id="rejectBtn" onClick={() => setModalIsOpen(true)}>
              {localization[current_lang].product.header.DenyButton}
            </button>
          </div>
        )}
      </div>
      <ProductModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} handleEntryConfirm={handleEntryConfirm} textarea={textarea} setTextarea={setTextarea}/>
      <Credentials />
      <ProductTable />
    </ProductContext.Provider>
  );
};

export default Product;
