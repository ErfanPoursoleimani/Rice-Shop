import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Value } from '@radix-ui/themes/components/data-list';
import useDataStore from '@/stores/dataStore';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

const options = [
  { value: 'ir', label: 'Iran' },
  { value: 'uae', label: 'UAE' },
  // { value: 'pa', label: 'Pakistan', disabled: true },
  // { value: 'tr', label: 'Turkey', disabled: true },
];
  
const RegionDropdown: React.FC = () => {
  
  const disabled = false
  const searchable = false
  const maxHeight = "max-h-60"
  
  const router = useRouter()
  const currentPath = usePathname()
  const { lang } = useParams()
  const { isRTL, dict } = useDataStore()
  
  const [selectedCountry, setSelectedCountry] = useState<string>('ir');

  const value = selectedCountry
  
/*   useEffect(() => {
    router.push(currentPath.replace(lang?.toString()!, selectedCountry)!)
  }, [selectedCountry]) */

  const onChange = (value: string) => {
    setSelectedCountry(value)
  }

  const onSelect = (option: any) => null

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
        <div className={`relative flex flex-col justify-center ${isRTL ? "items-end" : "items-start"}`} ref={dropdownRef}>
          <span className={`
                flex items-center justify-center gap-2
                ${isRTL ? "flex-row-reverse" : "flex-row"}
            `}
          >
            <label className='min-w-max text-[13px] text-neutral-500'>
              Region
            </label>
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className={`
                relative flex items-center gap-1
               text-gray-700 text-[14px]
                focus:outline-none
                transition-colors duration-200
                ${isRTL ? "flex-row-reverse" : "flex-row"}
              `}
            >
              <span className="block truncate">
                {selectedOption!.label}
              </span>
              <ChevronDownIcon
                className={`
                  w-4 h-4 text-gray-400
                  transition-transform duration-200
                  ${isOpen ? 'rotate-180' : 'rotate-0'}
                `}
              />
            </button>
          </span>
            {isOpen && !disabled && (
            <div className={`
                absolute top-7 z-12 mt-1
                bg-white border border-gray-300 rounded-b-lg shadow-lg
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
                    className={`
                        w-full px-4 py-3 text-sm
                        first:rounded-t-lg last:rounded-b-lg
                        transition-colors duration-150 text-center
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

export default RegionDropdown;