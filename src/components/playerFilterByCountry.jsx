import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

const PlayerFilterByCountry = ({ filterCountry, handleFilterCountryChange, countries }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const filterContainerRef = useRef(null);

  const countryOptions = countries.map((country) => ({
    value: country,
    label: country,
  }));

  const handleSelectChange = (selectedOption) => {
    handleFilterCountryChange(selectedOption);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Only close the dropdown, don't clear the selection
      }
    };

    if (isDropdownOpen) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div style={{ position: "relative" }} ref={filterContainerRef}>
      {filterCountry && (
        <div style={{ position: "absolute", top: "17px", left: "-100px", zIndex: 1000, width: "250px" }} ref={dropdownRef}>
          <Select
            options={countryOptions}
            onChange={handleSelectChange}
            placeholder="Select Country"
            className="filter-select"
            onMenuOpen={() => setIsDropdownOpen(true)}
            onMenuClose={() => setIsDropdownOpen(false)}
            menuIsOpen={isDropdownOpen} // Control the open state of the dropdown
            styles={{
              control: (provided) => ({
                ...provided,
                width: '160px',
                paddingRight: '0px',
              }),
              placeholder: (provided) => ({
                ...provided,
                whiteSpace: 'nowrap',
              }),
              menu: (provided) => ({
                ...provided,
                width: '160px',
              }),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerFilterByCountry;
