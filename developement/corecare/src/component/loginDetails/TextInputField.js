import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './password.css';
import Gender from './Gender';
import CountrySelector from './CountrySelector';
import MultiSelectField from './MultiSelectField';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../Recoil/Atom';

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
    // const handleChange1 = (event) => {
    //     SetUser(props.name, event.target.value)
    // }
    const setUserInfo = useSetRecoilState(userInfo);
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
                style={styleInput}
                type={props.type}
                name={props.name}
                onChange={handleChange}
                required={props.required}
                placeholder={props.placeholder} />
        </div>
    );
};

export function PasswordInputField(props) {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const setUserInfo = useSetRecoilState(userInfo);

    const handleChange = (event) => {
        setPassword(event.target.value)
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
        // SetUser('password', event.target.value)
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
    const options = props.optionsList.map((option) => {
        return (
            <option>{option}</option>
        );
    });
    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <select style={styleInput} placeholder={props.placeholder} required={props.required}>
                <option disabled selected hidden style={{ textAlign: 'left' }}>{props.placeholder}</option>
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

    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <input style={styleDate} type="date" placeholder={props.placeholder} />
        </div>
    );
};

export function GenderInputField(props) {

    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <Gender option1={props.option1} option2={props.option2} />
        </div>
    );
};

export function CountrySelectorField() {

    return (
        <div>
            <label style={styleLabel}>Country</label>
            <CountrySelector />
        </div>
    );
};

export function RadioField(props) {
    // const handleChange = (event) => {
    //     SetUser('typeUser', event.target.value)
    // }
    const setUserInfo = useSetRecoilState(userInfo);
    const handleChange = (event) => {

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'typeUser': event.target.value
        }));
    }
    return (
        <div className='row' style={{ marginLeft: '12px' }}>
            <div className='col col-lg-6' style={{ textAlign: 'left' }}>
                <input type='radio' name={props.name} style={styleRadio} value={props.label1} onChange={handleChange} />
                <label style={styleLabelRadio}>{props.label1}</label>
            </div>
            {props.label2 ?
                <div className='col col-lg-6' style={{ textAlign: 'left' }}>
                    <input type='radio' name={props.name} style={styleRadio} value={props.label2} onChange={handleChange} />
                    <label style={styleLabelRadio}>{props.label1}</label>
                </div>
                : null
            }
        </div>
    );
};


