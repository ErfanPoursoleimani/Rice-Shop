// hooks/usePopup.ts
import { useEffect, useRef, useState, useCallback } from 'react';

export interface PopupConfig {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'danger' | 'success' | 'warning';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export const usePopup = (defaultConfig?: Partial<PopupConfig>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<PopupConfig>({
    size: 'md',
    variant: 'default',
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    ...defaultConfig,
  });

  const popupRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Open popup with optional config
  const openPopup = useCallback((newConfig?: Partial<PopupConfig>) => {
    // Store currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    if (newConfig) {
      setConfig(prev => ({ ...prev, ...newConfig }));
    }
    setIsOpen(true);
  }, []);

  // Close popup
  const closePopup = useCallback(() => {
    setIsOpen(false);
    
    // Restore focus to previously active element
    setTimeout(() => {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }, 100);
  }, []);

  // Toggle popup
  const togglePopup = useCallback((newConfig?: Partial<PopupConfig>) => {
    if (isOpen) {
      closePopup();
    } else {
      openPopup(newConfig);
    }
  }, [isOpen, openPopup, closePopup]);

  // Update config without opening
  const updateConfig = useCallback((newConfig: Partial<PopupConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!config.closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closePopup, config.closeOnEscape]);

  // Focus management
  useEffect(() => {
    if (isOpen && popupRef.current) {
      // Focus the popup container
      popupRef.current.focus();
      
      // Focus first focusable element inside popup
      const focusableElements = popupRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (config.closeOnOverlayClick && e.target === e.currentTarget) {
      closePopup();
    }
  }, [closePopup, config.closeOnOverlayClick]);

  // Trap focus within popup
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && popupRef.current) {
      const focusableElements = popupRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    }
  }, []);

  return {
    // State
    isOpen,
    config,
    
    // Actions
    openPopup,
    closePopup,
    togglePopup,
    updateConfig,
    setConfig: updateConfig, // Alias for backwards compatibility
    
    // Handlers and refs for component
    popupRef,
    handleOverlayClick,
    handleKeyDown,
    
    // Computed values
    sizeClasses: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    }[config.size || 'md'],
    
    variantClasses: {
      default: 'border-gray-200',
      danger: 'border-red-200',
      success: 'border-green-200',
      warning: 'border-yellow-200',
    }[config.variant || 'default'],
    
    titleColorClasses: {
      default: 'text-gray-900',
      danger: 'text-red-900',
      success: 'text-green-900',
      warning: 'text-yellow-900',
    }[config.variant || 'default'],
  };
};

// Specialized hook for confirmation dialogs
export const useConfirmationPopup = (defaultConfig?: Partial<PopupConfig>) => {
  const popup = usePopup({
    size: 'sm',
    showCloseButton: false,
    closeOnOverlayClick: false,
    closeOnEscape: false,
    ...defaultConfig,
  });
  
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'danger' | 'success' | 'warning';
  } = {}): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      popup.openPopup({
        title: options.title || 'Confirm Action',
        variant: options.variant || 'default',
      });
    });
  }, [popup]);

  const handleConfirm = useCallback(() => {
    resolveRef.current?.(true);
    resolveRef.current = null;
    popup.closePopup();
  }, [popup]);

  const handleCancel = useCallback(() => {
    resolveRef.current?.(false);
    resolveRef.current = null;
    popup.closePopup();
  }, [popup]);

  // Override closePopup to handle rejection
  const closePopup = useCallback(() => {
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
    popup.closePopup();
  }, [popup]);

  return {
    ...popup,
    closePopup,
    confirm,
    handleConfirm,
    handleCancel,
  };
};

// Hook for alert/notification popups
export const useAlertPopup = (defaultConfig?: Partial<PopupConfig>) => {
  const popup = usePopup({
    size: 'sm',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    ...defaultConfig,
  });

  const alert = useCallback((options: {
    title?: string;
    message: string;
    variant?: 'default' | 'danger' | 'success' | 'warning';
    duration?: number; // Auto-close after duration (ms)
  }) => {
    popup.openPopup({
      title: options.title,
      variant: options.variant || 'default',
    });

    // Auto-close after duration
    if (options.duration && options.duration > 0) {
      setTimeout(() => {
        popup.closePopup();
      }, options.duration);
    }
  }, [popup]);

  return {
    ...popup,
    alert,
  };
};