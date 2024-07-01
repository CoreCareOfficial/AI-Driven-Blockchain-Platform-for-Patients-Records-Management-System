import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import SettingCountrySelector from './SettingCountrySelector';
import { Button } from "primereact/button";
import { useSetRecoilState } from "recoil";
import { userHealthInfo } from "../../Recoil/Atom";
import { Image } from "react-bootstrap";
import defaultPic from '../../assets/user_signup.png';

import ahmed from '../../assets/ahmed.jpg';
// import user_signup from '../../assets/user_signup.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';




export function UpdateImage(props) {
    const fileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(defaultPic);

    useEffect(() => {
        if (props.img) {
            setSelectedImageUrl(`data:image/jpeg;base64,${props.img}`);
        }
    }, [props.img]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImageUrl(e.target.result); // Store the image URL for display
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file.');
        }
    };

    return (
        <>
            <Image
                src={selectedImageUrl}
                thumbnail
                roundedCircle
                style={{ cursor: 'pointer', width: '130px', height: '130px', margin: '0px auto' }}
                onClick={() => {
                    fileRef.current.click();
                }}
            />
            <input
                type="file"
                accept="image/*"
                ref={fileRef}
                style={{ display: 'none', flex: '1' }}
                onChange={handleFileChange}
            />
        </>
    );
};

export function SettingForm(props) {

    const changState = (e) => {
        e.preventDefault()
        if (props.TheEvent) {
            props.TheEvent();
        }
    }
    return (
        <form className={props.name}>
            <fieldset name="general-info">
                <legend style={{ color: 'white' }}>{props.legend}</legend>
                {props.children}
                {props.show === false ? (
                    <Button label={props.btn}
                        className="bg-[#3146FF] my-2 text-white  rounded-[8px] p-1 self-center"
                        onClick={changState}
                    />
                ) : null}
            </fieldset>
        </form>
    );
};

export function DynamicForm(props) {
    const setUserHealthInfo = useSetRecoilState(userHealthInfo);

    const handleSubmit = (event) => {
        const lastCard = props.cards[props.cards.length - 1];
        event.preventDefault();
        if (lastCard.medname && lastCard.dosage) {
            setUserHealthInfo((prevUserInfo) => ({
                ...prevUserInfo,
                prescription: [
                    ...(Array.isArray(prevUserInfo.prescription) ? prevUserInfo.prescription : []),
                    ...props.cards
                ],
            }));
            props.handleDiagnosisClick();
            console.log(props.cards)
        } else {
            alert('Please fill all fields before adding a new card.');
        }
    }
    return (
        <form className={props.name}>
            {props.children}
            <Button label="Submit" icon="pi pi-check-circle" className="bg-[#3146FF] my-2 text-white font-bold rounded-[10px] p-2 self-center" onClick={handleSubmit} />
        </form>
    );
};


export function AddEmergency(props) {
    const changState = (e) => {
        e.preventDefault()
        if (props.TheEvent) {
            props.TheEvent();
        }
    }
    return (
        <form
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0px 5px',
            }}>
            <input type={props.type} placeholder={props.placeholder} name={props.name} disabled={props.disabled} />
            <Button label={props.btn} className="bg-[#3146FF] my-2 text-white w-[20%] rounded-[8px] p-1 self-center" onClick={changState} />
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
                    style={{ color: props.disabled ? "gray" : "white" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={props.placeholder}
                    required
                    name={props.name}
                    disabled={props.disabled}
                />
                {isVisible ?
                    <span><FaEye onClick={toggleVisibility} /></span> :
                    <span><IoIosEyeOff onClick={toggleVisibility} /></span>
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
                    style={{ color: props.disabled ? "gray" : "white" }}
                    type="text"
                    placeholder={props.placeholder}
                    name={props.name}
                    disabled={props.disabled}
                    value={props.value}
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
            <input type={props.type}
                style={{ color: props.disabled ? "gray" : "white" }}
                placeholder={props.placeholder}
                onChange={props.onChange}
                name={props.name}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                value={props.value}
            />
        </div>
    );
};

export function SettingTimeInput(props) {
    const [timeValue, setTimeValue] = useState(props.value ? props.value : "");
    console.log(timeValue);
    return (
        <div className={props.class_name}>
            <label>{props.label}</label>
            <input
                type='time'
                style={{ color: props.disabled ? "gray" : "white" }}
                placeholder={props.placeholder}
                onChange={(e) => setTimeValue(e.target.value)}
                name={props.name}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                value={timeValue}
            />
        </div>
    );
};

export function SettingSelect(props) {

    const hidtext = props.value;

    const listItems = props.items.map((item, index) => (
        <option key={index}>{item}</option>
    ));
    return (
        <div className="SettingSelect">
            <label>{props.label}</label>
            <select placeholder="" name={props.name} disabled={props.disabled}
                style={{ color: props.disabled ? "gray" : "white" }}>
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
            <SettingCountrySelector disabled={props.disabled} value={props.value} />
        </div>
    );
};

export function MedicalDegree(props) {
    const items = {
        "General Medical Practice Degrees":
            [
                "Doctor of Medicine(MD)",
                "Doctor of Osteopathic Medicine(DO)",
                "Bachelor of Medicine, Bachelor of Surgery(MBBS or MBChB)"
            ],
        "Specialized Medical Practice Degrees":
            [
                "Doctor of Dental Surgery (DDS)",
                "Doctor of Dental Medicine (DMD)",
                "Doctor of Podiatric Medicine (DPM)",
                "Doctor of Optometry (OD)",
                "Doctor of Pharmacy (PharmD)",
                "Doctor of Chiropractic (DC)",
                "Doctor of Veterinary Medicine (DVM)"
            ]
    };

    const selectItems = Object.keys(items).map((optgroup) => {
        return (
            <optgroup key={optgroup} label={optgroup}>
                {items[optgroup].map((item) => {
                    return (
                        <option key={item} value={item}>{item}</option>
                    );
                }
                )
                }
            </optgroup>
        );
    }
    );

    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value)
    };

    return (
        <div className="SettingSelect">
            <label>{props.label}</label>
            <select id="dino-select" value={selectedValue} onChange={handleChange} disabled={props.disabled} style={{ color: props.disabled ? "gray" : "white" }}>
                <option disabled selected hidden>{props.value}</option>
                {selectItems}
            </select>
        </div>


    );
};

export function SpecializationSelect(props) {
    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value)
    };
    const options = props.optionsList.map((option, index) => {
        return (
            <option key={index} value={option}>{option}</option>
        );
    });
    return (
        <div className="SettingSelect">
            <label >{props.label}</label>
            <select
                placeholder={props.placeholder}
                value={selectedValue}
                onChange={handleChange}
                disabled={props.disabled}
                style={{ color: props.disabled ? "gray" : "white" }}
            >
                <option disabled selected hidden value="" style={{ textAlign: 'left' }}>{props.value}</option>
                {options}
            </select>
        </div>
    );
};

export function DynamicInput(props) {
    const lab={
        color:'#272c34',
        fontWeight:'700',
    }
    const inp={
        width:'calc(100% - 85px)',
        borderBottom:'1px solid #3146ff',
        outline:'none',
        fontWeight:'500',
    }

    return (
        <>
            <div style={{ margin:'10px 5px',display:'flex', justifyContent:'space-between'}}>
                {props .children}
                <label style={lab}>{props.label}</label>
                <input style={inp} type={props.type} value={props.value} disabled={props.disabled} />
            </div>
        </>
    );
}