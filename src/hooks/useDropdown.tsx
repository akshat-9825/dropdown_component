import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import classNames from "classnames";
import { Avatar, User } from "../utils";
import "./dropdown.css";

interface DropdownProps {
  data: User[];
}

interface UseDropdownProps {
  inputProps: React.HTMLAttributes<HTMLDivElement> & { placeholder: string };
  dropdownProps: DropdownProps;
}

const useDropdown = ({ inputProps, dropdownProps }: UseDropdownProps) => {
  const { data } = dropdownProps;
  const dataNames = useMemo(
    () =>
      data
        .map((item) => {
          return item.name;
        })
        .sort(),
    [data]
  );
  const [filteredData, setFilteredData] = useState(data.sort());
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data.sort());
    }
  }, [data]);

  const handleInputChange = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const inputValue = inputRef.current?.textContent?.toLowerCase() || "";
      if (event.key === "Enter") {
        setSelected((prevSelected) => {
          if (
            dataNames.includes(inputValue) &&
            !prevSelected.includes(inputValue)
          ) {
            return [...prevSelected, inputValue];
          }
          return [...prevSelected];
        });
        setIsDropdownVisible(false);
        inputRef.current?.blur();
      }
      if (inputValue === "") {
        if (event.key === "Backspace" && selected.length > 0) {
          setSelected(selected.slice(0, -1));
        }
      }
      const filteredValues = data.filter(
        ({ name }) =>
          (inputValue.length > 0
            ? name.toLowerCase().includes(inputValue)
            : true) && !selected.includes(name)
      );
      setFilteredData(filteredValues.sort());
    },
    [data, dataNames, selected]
  );

  const handleInputClick = useCallback(() => {
    setIsDropdownVisible(true);
  }, []);

  const handleAvatarClick = useCallback((avatarName: string) => {
    setSelected((prevSelected) => {
      if (!prevSelected.includes(avatarName)) {
        return [...prevSelected, avatarName];
      }
      return [...prevSelected];
    });
    setFilteredData((prevValue) => {
      return prevValue.filter((item) => item.name !== avatarName);
    });
  }, []);

  const handleAvatarRemove = useCallback(
    (avatarName: string) => {
      setSelected((prevSelected) =>
        prevSelected.filter((name) => name !== avatarName)
      );
      setFilteredData(
        [
          ...filteredData,
          {
            name: avatarName,
            image: data.find(({ name }) => name === avatarName)?.image || "",
          },
        ].sort()
      );
    },
    [data, filteredData]
  );

  const SelectedAvatars = useCallback(() => {
    return (
      <div className="flex flex-row flex-wrap gap-2">
        {selected.length > 0
          ? selected.map((avatar) => (
              <Avatar
                key={avatar}
                name={avatar}
                image={data.find(({ name }) => name === avatar)?.image || ""}
                className="border-gray-500 border rounded-full min-w-36 pr-8 h-8"
                imageClassName="-z-10 "
                onRemove={() => handleAvatarRemove(avatar)}
              />
            ))
          : null}
      </div>
    );
  }, [data, handleAvatarRemove, selected]);

  return {
    inputProps: {
      ...inputProps,
      role: "textbox",
      contentEditable: true,
      suppressContentEditableWarning: true,
      onKeyDown: handleInputChange,
      onClick: handleInputClick,
      ref: inputRef,
      className: classNames("dropdown-input", inputProps.className),
    },
    isDropdownVisible,
    SelectedAvatars,
    selected,
    filteredData,
    Dropdown: () =>
      isDropdownVisible &&
      filteredData.length > 0 && (
        <div
          className="absolute w-80 h-fit z-10 mt-2 bg-white border rounded shadow-md"
          ref={dropdownRef}>
          {filteredData.map(({ name, image }, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAvatarClick(name)}>
              <Avatar name={name} image={image} />
            </div>
          ))}
        </div>
      ),
  };
};

export default useDropdown;
