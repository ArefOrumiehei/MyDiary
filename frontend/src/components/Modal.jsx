import "../styles/modal.css";

export default function Modal({ message, onConfirm, onCancel, confirmTxt, cancelTxt }) {
  return (
    <div className="modalBackdrop">
      <div className="modalBox">
        <p>{message}</p>
        <div className="modalActions">
          <button className="confirmBtn" onClick={onConfirm}>{confirmTxt}</button>
          <button className="cancelBtn" onClick={onCancel}>{cancelTxt}</button>
        </div>
      </div>
    </div>
  );
}
