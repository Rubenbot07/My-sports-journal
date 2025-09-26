import { createPortal } from "react-dom";
import { FocusTrap } from "focus-trap-react";
import { X } from "lucide-react";
import { useEffect} from "react";

export function Modal({ isOpen, onClose, children }) {

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden"; // block scroll when modal is open
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;


  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true, // permite cerrar al hacer clic fuera
        escapeDeactivates: true,       // permite cerrar con ESC
      }}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        {/* Modal content */}
        <div
          className="bg-white p-6 rounded-xl shadow-lg w-96 max-w-8/9 md:max-w-none md:w-[800px] relative -top-20"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro
        >
          {children}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 bg-primary text-white rounded-full"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </FocusTrap>,
    document.getElementById("modal-root")
  );
}