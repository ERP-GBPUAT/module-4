import { AiOutlineClose } from "react-icons/ai";
import "./Modal.css";

const Modal = ({ title, content, closeModal, required }) => {
  return (
    <>
      <div className="modal">
        <div className="modal-header p-4 flex justify-between items-center">
          <div className="font-bold">{title}</div>
          {!required && (
            <AiOutlineClose
              style={{ transform: "scale(1.2)" }}
              className="cursor-pointer"
              onClick={closeModal}
            />
          )}
        </div>
        <div className="p-4">{content}</div>
      </div>
      <div className="modal-backdrop" onClick={closeModal}></div>
    </>
  );
};

export default Modal;
