import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "../utils";

interface DropdownProps {
  data: string[];
}

interface UseDropdownProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  dropdownProps: DropdownProps;
}

const useDropdown = ({ inputProps, dropdownProps }: UseDropdownProps) => {
  const { data } = dropdownProps;
  const [filteredData, setFilteredData] = useState<string[]>(data ? data : []);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue != "") {
      const filteredValues = data.filter((item) =>
        item.toLowerCase().includes(inputValue)
      );
      setFilteredData(filteredValues);
    } else {
      setFilteredData(data);
    }
  };

  const handleInputClick = () => {
    setIsDropdownVisible(true);
  };

  return {
    inputProps: {
      ...inputProps,
      onChange: handleInputChange,
      onClick: handleInputClick,
      ref: inputRef,
    },
    isDropdownVisible,
    filteredData,
    Dropdown: () =>
      isDropdownVisible && (
        <div className="absolute w-80 h-80 z-10 mt-2 bg-white border rounded shadow-md">
          {filteredData.map((item) => (
            <div key={item} className="p-2 hover:bg-gray-100 cursor-pointer">
              <Avatar name={item} />
            </div>
          ))}
        </div>
      ),
  };
};

export default useDropdown;
