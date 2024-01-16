import { useState, useEffect, useRef, useCallback } from "react";
import classNames from "classnames";
import { Avatar } from "../utils";
import "./dropdown.css";

interface DropdownProps {
  data: string[];
}

interface UseDropdownProps {
  inputProps: React.HTMLAttributes<HTMLDivElement> & { placeholder: string };
  dropdownProps: DropdownProps;
}

const useDropdown = ({ inputProps, dropdownProps }: UseDropdownProps) => {
  const { data } = dropdownProps;
  const [filteredData, setFilteredData] = useState<string[]>(data ? data : []);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = useCallback(() => {
    const inputValue = inputRef.current?.textContent?.toLowerCase() || "";
    if (inputValue !== "") {
      const filteredValues = data.filter((item) =>
        item.toLowerCase().includes(inputValue)
      );
      setFilteredData(filteredValues);
    } else {
      setFilteredData(data);
    }
  }, [data]);

  const handleInputClick = useCallback(() => {
    setIsDropdownVisible(true);
  }, []);

  const handleAvatarClick = useCallback(
    (avatarName: string) => {
      setSelected((prevSelected) => [...prevSelected, avatarName]);
    },
    [setSelected]
  );

  const handleAvatarRemove = useCallback(
    (avatarName: string) => {
      setSelected((prevSelected) =>
        prevSelected.filter((name) => name !== avatarName)
      );
    },
    [setSelected]
  );

  const selectedAvatars = selected.map((avatar) => (
    <Avatar
      key={avatar}
      name={avatar}
      onRemove={() => handleAvatarRemove(avatar)}
    />
  ));

  return {
    inputProps: {
      ...inputProps,
      role: "textbox",
      contentEditable: true,
      onInput: handleInputChange,
      onClick: handleInputClick,
      ref: inputRef,
      className: classNames("dropdown-input", inputProps.className),
      placeholder: inputProps.placeholder,
    },
    isDropdownVisible,
    selectedAvatars,
    filteredData,
    Dropdown: () =>
      isDropdownVisible &&
      filteredData.length > 0 && (
        <div
          className="absolute w-80 h-fit z-10 mt-2 bg-white border rounded shadow-md"
          ref={dropdownRef}>
          {filteredData.map((item) => (
            <div
              key={item}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAvatarClick(item)}>
              <Avatar name={item} />
            </div>
          ))}
        </div>
      ),
  };
};

export default useDropdown;
