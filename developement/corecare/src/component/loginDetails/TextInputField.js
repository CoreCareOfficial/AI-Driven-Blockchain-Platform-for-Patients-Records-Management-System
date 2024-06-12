import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './password.css';
import Gender from './Gender';
import CountrySelector from './CountrySelector';
import MultiSelectField from './MultiSelectField';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { HealthcareFacilityInfo, userInfo } from '../../Recoil/Atom';

const styleInput = {
    backgroundColor: '#ffffff',
    width: '100%',
    minWidth: '40px',
    height: '34px',
    borderRadius: '50PX',
    fontFamily: 'DM Sans',
    fontSize: '12px',
    margin: "4px 0",
    paddingLeft: '12px',
};

const styleLabel = {
    color: '#eaeaea',
    fontSize: '12px',
    fontFamily: 'DM Sans',
    fontWeight: 700,
    display: 'block',
    textAlign: 'left',
    margin: '4px 0 0 0'
}

const styleDate = {
    backgroundColor: '#ffffff',
    width: '100%',
    minWidth: '40px',
    height: '34px',
    borderRadius: '50PX',
    fontFamily: 'DM Sans',
    fontSize: '14px',
    margin: "4px 0",
    paddingLeft: '12px',
    paddingRight: '12px',
};

const styleLabelRadio = {
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'DM Sans',
    textAlign: 'left',
};

const styleRadio = {
    width: '16px',
    height: '16px',
    marginRight: '6px'
};

// function SetUser({ name, newValue }) {
//     const setUserInfo = useSetRecoilState(userInfo);

//     setUserInfo((prevUserInfo) => ({
//         ...prevUserInfo,
//         [name]: newValue
//     }));
// }

export function TextInputField(props) {
    const setUserInfo = useSetRecoilState(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const userInfoValue = useRecoilValue(props.isFacility ? HealthcareFacilityInfo : userInfo);

    const keyUserInfo = props.name;
    const handleChange = (event) => {

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
        console.log(event.target.value);
    }
    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <input
                style={styleInput}
                type={props.type}
                name={props.name}
                onChange={handleChange}
                value={userInfoValue[keyUserInfo]}
                required={props.required}
                placeholder={props.placeholder} />
        </div>
    );
};

export function PasswordInputField(props) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const setUserInfo = useSetRecoilState(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const userInfoValue = useRecoilValue(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const [password, setPassword] = useState(userInfoValue[props.name]);

    const handleChange = (event) => {
        setPassword(event.target.value)
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
    }

    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <div className="password-input">
                <input
                    style={styleInput}
                    type={isVisible ? "text" : "password"}
                    name={props.name}
                    value={password}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                    required
                />
                <FontAwesomeIcon
                    style={{ margin: '-4px 6px 0 0', color: "#181a1f" }}
                    icon={isVisible ? faEye : faEyeSlash}
                    className="visibility-icon"
                    onClick={toggleVisibility}
                />
            </div>

        </div>
    );
};

export function SelectInputField(props) {
    const setUserInfo = useSetRecoilState(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const userInfoValue = useRecoilValue(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const [selectedValue, setSelectedValue] = useState(userInfoValue[props.name]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
        console.log(event.target.value)
    };
    const options = props.optionsList.map((option, index) => {
        return (
            <option key={index} value={option}>{option}</option>
        );
    });
    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <select
                style={styleInput}
                placeholder={props.placeholder}
                required={props.required}
                value={selectedValue}
                onChange={handleChange}
            >
                <option disabled selected hidden value="" style={{ textAlign: 'left' }}>{props.placeholder}</option>
                {options}
            </select>
        </div>
    );
};

export function SelectMultiInputField(props) {
    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <MultiSelectField placeholder={props.placeholder} style={styleInput} />
        </div>
    );
};


export function DateInputField(props) {
    const setUserInfo = useSetRecoilState(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const userInfoValue = useRecoilValue(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const handleChange = (event) => {

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
    }
    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <input
                name={props.name}
                style={styleDate}
                type="date"
                value={userInfoValue[props.name]}
                placeholder={props.placeholder}
                onChange={handleChange}
                required />
        </div>
    );
};

export function GenderInputField(props) {

    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <Gender option1={props.option1} option2={props.option2} name={props.name} isFacility={props.isFacility} />
        </div>
    );
};

export function CountrySelectorField(props) {

    return (
        <div>
            <label style={styleLabel}>Country *</label>
            <CountrySelector name={props.name} isFacility={props.isFacility} />
        </div>
    );
};

export function RadioField(props) {
    return (
        <div className='row' style={{ marginLeft: '12px' }}>
            <div className='col col-lg-6' style={{ textAlign: 'left' }}>
                <label htmlFor={props.label1} style={styleLabelRadio}>
                    <input
                        type='radio'
                        id={props.label1}
                        name={props.name}
                        style={styleRadio}
                        value={props.label1}
                        onChange={props.onSelected}
                        checked={props.selectedTypeValue === props.label1}
                    />
                    {props.label1}
                </label>
            </div>
            {props.label2 &&
                <div className='col col-lg-6' style={{ textAlign: 'left' }}>
                    <label htmlFor={props.label2} style={styleLabelRadio}>
                        <input
                            id={props.label2}
                            type='radio'
                            name={props.name}
                            style={styleRadio}
                            value={props.label2}
                            onChange={props.onSelected}
                            checked={props.selectedTypeValue === props.label2}
                        />
                        {props.label2}
                    </label>
                </div>
            }
        </div>
    );
};

