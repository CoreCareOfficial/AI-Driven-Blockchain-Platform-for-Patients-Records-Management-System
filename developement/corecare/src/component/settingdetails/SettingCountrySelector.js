import React, { useState, useEffect } from 'react';
import countryList from 'react-select-country-list';
function SettingCountrySelector(props) {

    const [value, setValue] = useState('Location');
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

    const changeHandler = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            {isLoading && <p>Loading countries...</p>}
            {error && <p>Error fetching countries: {error.message}</p>}
            {!isLoading && !error && (
                <select onChange={changeHandler} disabled={props.disabled} style={{color:props.disabled ? "gray":"white"}}>
                    <option selected value={value}>
                    {value}
                    </option> {/* Default option */}
                    {options.map((country) => (
                    <option key={country.value} value={country.value}>
                        {country.label}
                    </option>
                    ))}
                </select>
            )}
        </>
    );
}

export default SettingCountrySelector;
