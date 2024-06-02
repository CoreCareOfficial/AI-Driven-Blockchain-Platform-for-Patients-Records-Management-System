import React,{ useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import SettingCountrySelector from './SettingCountrySelector';
import { Button } from "primereact/button";
import { useSetRecoilState } from "recoil";
import { userHealthInfo } from "../../Recoil/Atom";

export function SettingForm(props) {
    return (
            <form className={props.name}>
                <fieldset name="general-info">
                    <legend style={{color:'white'}}>{props.legend}</legend>
                    {props.children}
                    <Button label={props.btn} className="bg-[#3146FF] my-2 text-white  rounded-[8px] p-1 self-center"/>
                </fieldset>
            </form>
    );
};

export function DynamicForm(props) {
    const setUserHealthInfo = useSetRecoilState(userHealthInfo);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserHealthInfo((prevUserInfo) => ({
            ...prevUserInfo,
            'prescription': props.cards
        }));
        props.handleDiagnosisClick();
        console.log(props.cards)
    }
    return (
            <form className={props.name}>
                    {props.children}
                    <Button label="Submit" icon="pi pi-check-circle" className="bg-[#3146FF] my-2 text-white font-bold rounded-[10px] p-2 self-center" onClick={handleSubmit}/>
            </form>
    );
};


export function AddEmergency(props) {
    return (
            <form 
            style={{display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                padding:'0px 5px',
            }}>
                <input  type={props.type} placeholder={props.placeholder} name={props.name} disabled={props.disabled}/>
                <Button label={props.btn} className="bg-[#3146FF] my-2 text-white w-[20%] rounded-[8px] p-1 self-center"/>
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
                    name={props.name}
                    disabled={props.disabled}
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
                    name={props.name}
                    disabled={props.disabled}
                />
                    <span>{props.icon}</span>
            </div>

        </div>
    );
};


export function SettingInput(props) {
    return (
        <div className={props.class_name}>
            <label >{props.label}</label>
            <input  type={props.type} 
            placeholder={props.placeholder} 
            onChange={props.onChange}
            name={props.name}
            disabled={props.disabled}
            />
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
            <select  placeholder="" name={props.name} disabled={props.disabled}>
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
            <SettingCountrySelector disabled={props.disabled}/>
        </div>
    );
};

