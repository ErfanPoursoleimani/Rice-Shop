// components/Popup.tsx
'use client'
import React from 'react';
import { X } from 'lucide-react';
import { usePopup, useConfirmationPopup, useAlertPopup } from '@/app/hooks/usePopup';
import useDataStore from '@/stores/dataStore';

interface PopupProps {
  children: React.ReactNode;
  popup: ReturnType<typeof usePopup>;
  className: string
}

const Popup: React.FC<PopupProps> = ({ children, popup, className }) => {
  if (!popup.isOpen) return null;
  const { isRTL } = useDataStore()

  return (
    <div
      className={`${className} fixed w-full h-full flex justify-center items-center bg-[#000000b2] animate-in fade-in duration-200`}
      onClick={popup.handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={popup.config.title ? 'popup-title' : undefined}
    >
      <div
        ref={popup.popupRef}
        className={`
          relative w-full md:max-w-150 max-md:min-h-[100vh] max-h-full overflow-hidden
          bg-white md:rounded-lg shadow-xl border-2 ${popup.variantClasses}
          animate-in zoom-in-95 duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
        tabIndex={-1}
        onKeyDown={popup.handleKeyDown}
      >
        {/* Header */}
        {(popup.config.title || popup.config.showCloseButton) && (
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""} p-4 border-b border-gray-200`}>
            {popup.config.title && (
              <h2
                id="popup-title"
                className={`md:text-[1rem] text-[0.9rem] ${popup.titleColorClasses}`}
              >
                {popup.config.title}
              </h2>
            )}
            {popup.config.showCloseButton && (
              <button
                onClick={popup.closePopup}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
                aria-label="Close popup"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;

// Confirmation Dialog Component
export const ConfirmationDialog: React.FC<{
  popup: ReturnType<typeof useConfirmationPopup>;
  message: string;
  confirmText?: string;
  cancelText?: string;
}> = ({ 
  popup, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel' 
}) => (
  <Popup popup={popup} className=''>
    <div className="space-y-4">
      <p className="text-gray-700">{message}</p>
      <div className="flex gap-2 justify-end">
        <button
          onClick={popup.handleCancel}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {cancelText}
        </button>
        <button
          onClick={popup.handleConfirm}
          className={`px-4 py-2 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            popup.config.variant === 'danger'
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              : popup.config.variant === 'warning'
              ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'
              : popup.config.variant === 'success'
              ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </Popup>
);

// Alert Dialog Component
export const AlertDialog: React.FC<{
  popup: ReturnType<typeof useAlertPopup>;
  message: string;
  buttonText?: string;
}> = ({ popup, message, buttonText = 'OK' }) => (
  <Popup popup={popup} className=''>
    <div className="space-y-4">
      <p className="text-gray-700">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={popup.closePopup}
          className={`px-4 py-2 text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            popup.config.variant === 'danger'
              ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
              : popup.config.variant === 'warning'
              ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'
              : popup.config.variant === 'success'
              ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </Popup>
);

// Example usage component
export const PopupExample: React.FC = () => {
  const basicPopup = usePopup();
  const confirmPopup = useConfirmationPopup();
  const alertPopup = useAlertPopup();

  const handleDelete = async () => {
    const confirmed = await confirmPopup.confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      alertPopup.alert({
        title: 'Success',
        message: 'Item has been deleted successfully!',
        variant: 'success',
        duration: 3000 // Auto-close after 3 seconds
      });
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Clean Popup Components Demo</h1>
      
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => basicPopup.openPopup({ 
            title: 'Basic Popup',
            variant: 'default',
            size: 'md' 
          })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Open Basic Popup
        </button>
        
        <button
          onClick={() => basicPopup.openPopup({ 
            title: 'Large Success Popup',
            variant: 'success',
            size: 'lg' 
          })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Open Large Popup
        </button>
        
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete Item (Confirmation)
        </button>
        
        <button
          onClick={() => alertPopup.alert({
            title: 'Information',
            message: 'This is an informational alert that will auto-close!',
            variant: 'default',
            duration: 2000
          })}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Show Alert
        </button>
      </div>

      {/* Basic Popup */}
      <Popup popup={basicPopup} className=''>
        <div className="space-y-4">
          <p className="text-gray-600">
            This popup uses the clean hook-based architecture. All logic is handled in the hook!
          </p>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Clean Architecture Benefits:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All logic is contained in the hook</li>
              <li>• Component only handles rendering</li>
              <li>• Easy to test and reuse</li>
              <li>• Focus management and accessibility built-in</li>
              <li>• TypeScript support throughout</li>
            </ul>
          </div>
          
          <div className="flex gap-2 pt-4">
            <button
              onClick={basicPopup.closePopup}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => basicPopup.updateConfig({ variant: 'warning', title: 'Updated!' })}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Update Config
            </button>
          </div>
        </div>
      </Popup>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        popup={confirmPopup}
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Alert Dialog */}
      <AlertDialog
        popup={alertPopup}
        message="This is an informational alert that will auto-close!"
        buttonText="Got it"
      />
    </div>
  );
};