import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { localization } from "../../util/localization";
import { LayoutContext } from "../../layout/context";
const ProductModal = ({
  isOpen,
  setIsOpen,
  handleEntryConfirm,
  textarea,
  setTextarea,
}) => {
  const { current_lang } = useContext(LayoutContext);
  return (
    <Modal className={"rejection"} isOpen={isOpen} ariaHideApp={false}>
      <div className="rejection__inner">
        <h4 className="rejection__title">
          {localization[current_lang].product.modal.title}:
        </h4>
        <form className="rejection__form">
          <textarea
            name="textarea"
            className="rejection__textarea"
            required={true}
            onChange={(e) => setTextarea(e.target.value)}
          />
          <div className="rejection-buttons">
            <button
              className="product__btn accept"
              type="submit"
              id="ok"
              onClick={(e) => {
                e.preventDefault();
                handleEntryConfirm(300);
              }}
            >
              {localization[current_lang].product.modal.AcceptButton}
            </button>
            <button
              className="product__btn deny"
              type="button"
              onClick={() => setIsOpen(false)}
              id="cancel"
            >
              {localization[current_lang].product.modal.DenyButton}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductModal;
