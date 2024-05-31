import React,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import SettingCountrySelector from './SettingCountrySelector'
export function SettingForm(props) {
    return (
            <form className={props.name}>
                <fieldset name="general-info">
                    <legend style={{color:'white'}}>{props.legend}</legend>
                    {props.children}
                    <Button variant="primary" style={{transition: '0.7s ease',height:'30px',paddingTop:'0px'}}>{props.btn}</Button>{' '}
                </fieldset>
            </form>
    );
};


export function AddEmergency(props) {
    return (
            <form className={props.name}
            style={{display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                padding:'0px 5px',
            }}>
                <input  type={props.type} placeholder={props.placeholder} />
                <Button variant="primary" style={{transition: '0.7s ease',width:'20%',height:'30px',paddingTop:'0px'}}>{props.btn}</Button>{' '}
            </form>
    );
};


export function PasswordSettingInput(props) {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="PasswordSetting">
            <label>{props.label}</label>
            <div className="PasswordSettingInput ">
                <input
                    type={isVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={props.placeholder}
                    required
                />
                {isVisible ? 
                    <span><FaEye onClick={toggleVisibility}/></span> :
                    <span><IoIosEyeOff onClick={toggleVisibility}/></span>
                }
            </div>

        </div>
    );
};

export function SocialSettingInput(props) {
    return (
        <div className="PasswordSetting">
            <label>{props.label}</label>
            <div className="SocialSettingInput ">
                <input
                    type="text"
                    placeholder={props.placeholder}
                />
                    <span>{props.icon}</span>
            </div>

        </div>
    );
};


export function SettingInput(props) {
    return (
        <div className="SettingInput">
            <label >{props.label}</label>
            <input  type={props.type} placeholder={props.placeholder} />
        </div>
    );
};

export function SettingSelect(props) {

    const hidtext="";
    
    const listItems = props.items.map((item, index) => (
        <option key={index}>{item}</option>
        ));
    return (
        <div className="SettingSelect">
            <label>{props.label}</label>
            <select  placeholder="" >
                <option disabled selected hidden>{hidtext}</option>
                {listItems}
            </select>
        </div>
    );
};

export function SettingCountry(props) {
    return (
        <div className="SettingCountry">
            <label>{props.label}</label>
            <SettingCountrySelector/>
        </div>
    );
};

