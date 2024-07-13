import React, { useState, useEffect } from 'react';
import countryList from 'react-select-country-list';
import { HealthcareFacilityInfo, userInfo } from '../../Recoil/Atom';
import { useSetRecoilState } from 'recoil';

function AddCountry(props) {

    const [value, setValue] = useState(props.value);
    const [options, setOptions] = useState([]); // Initialize options state
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Store any errors
    const user = props.isFacility ? HealthcareFacilityInfo : userInfo;
    const setUserInfo = useSetRecoilState(user);

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
        console.log(e.target.value);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: e.target.value
        }));
    };

    const inp = {
        width: 'calc(100% - 50%)',
        borderBottom: '1px solid #3f4652',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#181a1f',
        color: '#fff'
    }
    return (
        <>
            {isLoading && <p>Loading countries...</p>}
            {error && <p>Error fetching countries: {error.message}</p>}
            {!isLoading && !error && (
                <select required={true} onChange={changeHandler} disabled={props.disabled} style={inp}>
                    <option selected value={value}>
                        {value}
                    </option> {/* Default option */}
                    {options.map((country) => (
                        <option key={country.value} value={country.value.label}>
                            {country.label}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}

export default AddCountry;
