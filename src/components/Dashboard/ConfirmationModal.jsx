// src/components/ConfirmationModal.jsx
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const ConfirmationModal = ({ modalData, setConfirmationModal }) => {
  const { text1 = "Confirm", text2 = "", onConfirm } = modalData || {};
  const overlayRef = useRef(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    confirmBtnRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") setConfirmationModal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [setConfirmationModal]);

  const handleOverlayMouseDown = (e) => {
    if (e.target === overlayRef.current) {
      setConfirmationModal(null);
    }
  };

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
    setConfirmationModal(null);
  };

  const modal = (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayMouseDown}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{ WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}
      />

      <div className="relative z-10 w-[92%] max-w-md bg-white rounded-lg shadow-lg p-5">
        <h3 className="text-lg font-semibold mb-2">{text1}</h3>
        <p className="text-sm text-gray-600 mb-4">{text2}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmationModal(null)}
            className="px-4 py-2 rounded border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            ref={confirmBtnRef}
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default ConfirmationModal;
