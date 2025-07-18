import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomDropdownProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onSelect?: (option: Option) => void;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  maxHeight?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  placeholder = "Select an option",
  value = "",
  onChange,
  onSelect,
  className = "",
  disabled = false,
  searchable = false,
  maxHeight = "max-h-60"
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    if (option.disabled) return;
    
    onChange(option.value);
    onSelect?.(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm("");
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
    }
  };

  return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={`
              relative w-full pl-4 pr-2 py-[7px] flex items-center gap-2
              bg-white border border-gray-300 rounded-lg
              text-right text-gray-700 text-[14px]
              focus:outline-none focus:ring-1 focus:ring-[var(--theme)] focus:border-[var(--theme)]
              transition-colors duration-200
              ${disabled
                ? 'bg-gray-100 cursor-not-allowed text-gray-400'
                : 'hover:border-gray-400 cursor-pointer'
              }
            `}
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDownIcon
              className={`
                w-4 h-4 text-gray-400
                transition-transform duration-200
                ${isOpen ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </button>
            {isOpen && !disabled && (
            <div className={`
                absolute w-45 z-10 mt-1
                bg-white border border-gray-300 rounded-lg shadow-lg
                ${maxHeight} overflow-auto
                animate-in fade-in slide-in-from-top-2 duration-200
            `}>
                {/* {searchable && (
                <div className="p-2 border-b border-gray-200">
                    <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                    />
                </div>
                )} */}
        
                {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                    No options found
                </div>
                ) : (
                filteredOptions.map((option) => (
                    <button
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={`
                        w-full px-4 py-3 text-left text-sm
                        first:rounded-t-lg last:rounded-b-lg
                        transition-colors duration-150
                        ${option.disabled
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none'
                        }
                        ${selectedOption?.value === option.value ? 'bg-blue-50 text-blue-700' : ''}
                    `}
                    >
                    {option.label}
                    </button>
                ))
                )}
            </div>
            )}
        </div>
  );
};

export default CustomDropdown;