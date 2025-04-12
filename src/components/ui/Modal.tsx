import React, { ReactNode, useEffect } from 'react';

const styles = {
  modalAnimation: `
    @keyframes scaleIn {
      0% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    .scale-transition {
      animation: scaleIn 0.3s ease-in-out forwards;
    }
  `
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  whole?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, whole }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
      onClick={onClose}
    >
      <style dangerouslySetInnerHTML={{ __html: styles.modalAnimation }} />

      <div
        className={`relative dark:bg-slate-950 bg-white rounded-lg shadow-lg p-6 ${whole ? 'lg:mr-10 lg:ml-72' : 'max-w-lg'} max-h-100 overflow-y-auto max-h-[90vh] w-full scale-transition`}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-2xl absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="modal-content">
          {title && <h2 className="text-center text-4xl mt-4 mb-8">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;