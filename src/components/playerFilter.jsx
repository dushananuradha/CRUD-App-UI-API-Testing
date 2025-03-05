import React from "react";
import { Form, Dropdown } from "react-bootstrap";
import Select from "react-select";

const FilterComponent = ({
    filterCountry,
    filterSport,
    handleFilterCountryChange,
    handleFilterSportChange,
    countries,
    sports,
}) => {
    const countryOptions = countries.map((country) => ({
        value: country,
        label: country,
    }));

    const sportOptions = sports.map((sport) => ({
        value: sport,
        label: sport,
    }));

    return (
        <div className="filter-dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    Filter Players
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Form.Check
                        type="checkbox"
                        label="By Country"
                        checked={filterCountry}
                        onChange={(e) => {
                            handleFilterCountryChange({ target: { checked: e.target.checked } });
                            if (!e.target.checked) {
                                handleFilterCountryChange({ target: { value: null } }); // Reset selected country when unchecked
                            }
                        }}
                    />
                    {filterCountry && (
                        <Select
                            options={countryOptions}
                            onChange={(selectedOption) =>
                                handleFilterCountryChange({
                                    target: { value: selectedOption ? selectedOption.value : null },
                                })
                            }
                            className="mb-3 filter-select"
                        />
                    )}

                    <Form.Check
                        type="checkbox"
                        label="By Sport"
                        checked={filterSport}
                        onChange={(e) => {
                            handleFilterSportChange({ target: { checked: e.target.checked } });
                            if (!e.target.checked) {
                                handleFilterSportChange({ target: { value: null } }); // Reset selected sport when unchecked
                            }
                        }}
                    />
                    {filterSport && (
                        <Select
                            options={sportOptions}
                            onChange={(selectedOption) =>
                                handleFilterSportChange({
                                    target: { value: selectedOption ? selectedOption.value : null },
                                })
                            }
                            className="mb-3 filter-select"
                        />
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default FilterComponent;