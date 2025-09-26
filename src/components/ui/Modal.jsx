import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 max-w-8/9 md:max-w-none md:w-[800px] relative">
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 p-1 bg-primary text-white rounded-full">
          <X  size={20}/>
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}