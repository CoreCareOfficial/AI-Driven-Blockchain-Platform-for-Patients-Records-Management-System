import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './password.css';
import Gender from './Gender';
import CountrySelector from './CountrySelector';

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

const styleSmallInput = {
    backgroundColor: '#ffffff',
    width: '90%',
    minWidth: '20px',
    height: '40px',
    borderRadius: '50PX',
    fontFamily: 'DM Sans',
    fontSize: '12px',
    margin: "4px 0 12px 0",
    paddingLeft: '12px',
};

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
    // fontWeight: 700,
    textAlign: 'left',
    // margin: '4px 0 0 0'
};

const styleRadio = {
    width: '16px',
    height: '16px',
    marginRight: '6px'
};

export function TextInputField(props) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <input
                style={styleInput}
                type={inputValue.includes('@') && inputValue.length > 2 ? 'email' : 'text'}
                value={inputValue}
                onChange={handleInputChange}
                required={props.required}
                placeholder={props.placeholder} />
        </div>
    );
};

export function PasswordInputField(props) {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <div className="password-input">
                <input
                    style={styleInput}
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

export function SmallTextInputField(props) {

    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <input style={styleSmallInput} type="text" placeholder={props.placeholder} />
        </div>
    );
};

export function SelectInputField(props) {
    return (
        <div>
            <label style={styleLabel}>{props.label}</label>
            <select style={styleInput} placeholder={props.placeholder} required={props.required}>
                <option disabled selected hidden>Select your blood type...</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
            </select>
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

    return (
        <div className='row' style={{ marginLeft: '12px' }}>
            <div className='col col-lg-6' style={{ textAlign: 'left' }}>
                <input type='radio' name={props.name} style={styleRadio} />
                <label style={styleLabelRadio}>{props.label1}</label>
            </div>
            {props.label2 ?
                <div className='col col-lg-6' style={{ textAlign: 'left' }}>
                    <input type='radio' name={props.name} style={styleRadio} />
                    <label style={styleLabelRadio}>{props.label1}</label>
                </div>
                : null
            }
        </div>
    );
};


