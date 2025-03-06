import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

const PlayerFilterBySport = ({ filterSport, handleFilterSportChange, sports }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sportOptions = sports.map((sport) => ({
        value: sport,
        label: sport,
    }));

    const handleSelectChange = (selectedOption) => {
        handleFilterSportChange(selectedOption);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
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
        <div style={{ position: "relative" }}>
            {filterSport && (
                <div style={{ position: "absolute", top: "17px", left: "-150px", zIndex: 1001, width: "50px" }} ref={dropdownRef}>
                    <Select
                        options={sportOptions}
                        onChange={handleSelectChange}
                        placeholder="Select Sport"
                        className="filter-select"
                        onMenuOpen={() => setIsDropdownOpen(true)}
                        onMenuClose={() => setIsDropdownOpen(false)}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                width: '140px',
                                paddingRight: '0px',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                whiteSpace: 'nowrap', // Prevent text wrapping
                            }),
                            menu: (provided) => ({
                                ...provided,
                                width: '140px', // Set the menu width to match the control width
                            }),
                            
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default PlayerFilterBySport;