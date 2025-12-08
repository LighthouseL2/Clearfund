import { useRef, useEffect } from 'react';

// interface FilterOption {
//   label: string;
//   checked: boolean;
// }

// interface FilterDropdownProps {
//   label: string;
//   options: FilterOption[];
//   onChange: (options: FilterOption[]) => void;
//   isOpen: boolean;
//   onToggle: () => void;
//   onClose: () => void;
// }

export default function FilterDropdown({ label, options, onChange, isOpen, onToggle, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleToggle = (index) => {
    const newFilters = options.map((filter, i) => ({
      ...filter,
      checked: i === index ? !filter.checked : false
    }));
    onChange(newFilters);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="bg-white h-[47px] w-full rounded-[10px] border border-[#cac1ca] px-5 flex items-center justify-between hover:border-[#39b54a] transition-colors"
      >
        <span className="font-['Inter:Regular',sans-serif] text-[14px] text-[rgba(0,0,0,0.5)]">
          {label}
        </span>
        <span className={`text-[rgba(0,0,0,0.5)] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-[5px] border-[0.5px] border-[rgba(0,0,0,0.3)] shadow-[2px_2px_2px_0px_rgba(0,0,0,0.25)] z-50 w-[243px]">
          <div className="bg-[#e8f7ee] h-[27px] px-5 flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative w-[10px] h-[10px] rounded-[2px] border border-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[4.625px] h-[4.625px] bg-black" />
                </div>
              </div>
              <span className="font-['Modern_Era:Medium',sans-serif] text-[14px] text-black">
                {label}
              </span>
            </label>
          </div>

          <div className="py-2">
            {options.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-gray-50"
              >
                <div className="relative w-[10px] h-[10px] rounded-[2px] border border-black">
                  {option.checked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[4.625px] h-[4.625px] bg-black" />
                    </div>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => handleToggle(index)}
                  className="hidden"
                />
                <span className="font-['Modern_Era:Medium',sans-serif] text-[14px] text-[rgba(0,0,0,0.7)]">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
