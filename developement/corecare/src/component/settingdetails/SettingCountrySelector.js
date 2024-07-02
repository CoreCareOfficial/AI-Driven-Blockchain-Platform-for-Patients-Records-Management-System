import React, { useState, useEffect } from 'react';
import countryList from 'react-select-country-list';
import { useSetRecoilState } from 'recoil';
import { updateUserInfo } from '../../Recoil/UpdateData';
function SettingCountrySelector(props) {

    const [value, setValue] = useState(props.value || "");
    const [options, setOptions] = useState([]); // Initialize options state
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Store any errors

    const setUserInfo = useSetRecoilState(updateUserInfo);

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
        }
    }, [props.value]);

    const handleOnBlur = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            country: newValue
        }));
    };
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
                <select value={value} onChange={changeHandler} onBlur={handleOnBlur} disabled={props.disabled} style={{ color: props.disabled ? "gray" : "white" }}>
                    <option selected value={value}>
                        {value}
                    </option> Default option
                    {options.map((country) => (
                        <option key={country.value} value={country.label}>
                            {country.label}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}

export default SettingCountrySelector;
