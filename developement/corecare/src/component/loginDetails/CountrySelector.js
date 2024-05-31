import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import './select.css';

function CountrySelector(props) {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]); // Initialize options state
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Store any errors

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await countryList().getData();
                setOptions(data);
            } catch (err) {
                setError(err); // Handle potential errors during data fetching
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(); // Fetch data on component mount
    }, []);

    const changeHandler = (value) => {
        setValue(value);
    };

    return (
        <div>
            {isLoading && <p>Loading countries...</p>}
            {error && <p>Error fetching countries: {error.message}</p>}
            {!isLoading && !error && (
                <Select
                    options={options}
                    value={value}
                    onChange={changeHandler}
                />
            )}
        </div>
    );
}

export default CountrySelector;