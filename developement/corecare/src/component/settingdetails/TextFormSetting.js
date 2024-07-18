import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import SettingCountrySelector from './SettingCountrySelector';
import { Button } from "primereact/button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { HealthcareFacilityInfo, userHealthInfo, userInfo } from "../../Recoil/Atom";
import { Image } from "react-bootstrap";
import defaultPic from '../../assets/user_signup.png';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Toast } from "primereact/toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddCountry from "../hospitaldetails/AddCountry";
import { updateUserInfo } from "../../Recoil/UpdateData";
import { AiOutlineSearch } from "react-icons/ai";


export function UpdateImage(props) {
    const fileRef = useRef(null);
    const toast = useRef(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(defaultPic);

    useEffect(() => {
        if (props.img) {
            setSelectedImageUrl(`data:image/jpeg;base64,${props.img}`);
        }
    }, [props.img]);

    const featchImageFacility = async (imageFile) => {
        if (!props.username && !props.userType) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Username User type health info' });
            console.log(props.username);
            return;
        }

        const formData = new FormData();
        formData.append('facilityPhoto', imageFile);
        formData.append('type', props.userType)
        try {
            const response = await fetch(`http://192.168.137.1:5000/healthcareproviders/updatefacilityphoto/${props.username}`, {
                method: "PUT",
                body: formData
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData);
            if (jsonData === "Facility Photo Updated Successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Facility Photo Updated Successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating health info' });
        }
    };

    const featchImagePersonal = async (imageFile) => {
        if (!props.username) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Usename health info' });
            return;
        }

        const formData = new FormData();
        formData.append('personalPhoto', imageFile);
        try {
            const response = await fetch(`http://192.168.137.1:5000/patients/personalphoto/${props.username}`, {
                method: "PUT",
                body: formData
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData);
            if (jsonData === "Personal photo updated successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successfully Updated' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating health info' });
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImageUrl(e.target.result); // Store the image URL for display
            };
            reader.readAsDataURL(file);
            if (file) {
                if (props.userType === 'Patient' || props.userType === 'Doctor') {
                    featchImagePersonal(file);
                } else {
                    featchImageFacility(file);
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Selected health info' });
            }
        } else {
            alert('Please select an image file.');
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <Image
                src={selectedImageUrl}
                thumbnail
                roundedCircle
                style={{ cursor: 'pointer', width: '130px', height: '130px', margin: '5px auto' }}
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
    const [value, setValue] = useState('');
    const toast = useRef(null);

    const changState = async (e) => {
        e.preventDefault();
        if (!props.userid) {
            props.handleAddContactSuccessful(false, 'ID is required');
            return;
        }
        if (!value) {
            props.handleAddContactSuccessful(false, 'Email OR Username is required');
            return;
        }
        const data = {
            emailorusername: value,
            patientid: props.userid
        };
        try {
            const response = await fetch(`http://192.168.137.1:5000/emergencycontacts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Emergency Contact Added Successfully") {
                props.handleAddContactSuccessful(true, 'Emergency Contact Added Successfully');
            } else {
                props.handleAddContactSuccessful(false, jsonData.message);
            }
        } catch (error) {
            console.error(error.message);
            props.handleAddContactSuccessful(false, 'Error Emergency Contact Added');
        }
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
            }}
            onSubmit={changState}>
            <Toast ref={toast} />
            <input type={props.type} value={value} placeholder={props.placeholder} name={props.name} disabled={props.disabled} onChange={(e) => setValue(e.target.value)} />
            <Button type='submit' label={props.btn} className="bg-[#3146FF] my-2 text-white w-[20%] rounded-[8px] p-1 self-center" />
        </form>
    );
};


export function PasswordSettingInput(props) {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const setUserInfo = useSetRecoilState(updateUserInfo);

    const handleOnBlur = (e) => {
        const newValue = e.target.value;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: newValue
        }));
    };

    return (
        <div className="PasswordSetting">
            <label>{props.label}</label>
            <div className="PasswordSettingInput ">
                <input
                    type={isVisible ? "text" : "password"}
                    style={{ color: props.disabled ? "gray" : "white" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleOnBlur}
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
    const [value, setValue] = useState(props.value || "");
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
            [props.name]: newValue
        }));
    };

    return (
        <div className="PasswordSetting">
            <label>{props.label}</label>
            <div className="SocialSettingInput ">
                <input
                    style={{ color: props.disabled ? "gray" : "white", paddingLeft: '22px' }}
                    type="text"
                    placeholder={props.placeholder}
                    name={props.name}
                    disabled={props.disabled}
                    value={value}
                    onBlur={handleOnBlur}
                    onChange={(e) => setValue(e.target.value)}
                />
                <span>{props.icon}</span>
            </div>

        </div>
    );
};

export function SettingInput(props) {
    const [value, setValue] = useState(props.value || "");
    const setUserInfo = useSetRecoilState(updateUserInfo);
    const userInfo = useRecoilValue(updateUserInfo);

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value);
        }
    }, [props.value]);

    const handleOnBlur = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (props.id) {
            // Ensure the target list is an array before updating
            const targetList = Array.isArray(userInfo[props.name]) ? userInfo[props.name] : [];
            // Create a new array with the new item
            const newList = [...targetList, { id: props.id, value: newValue }];
            // Update the atom state
            setUserInfo(prevUserInfo => ({
                ...prevUserInfo,
                [props.name]: newList
            }));

        } else {
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                [props.name]: newValue
            }));
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <div className={props.class_name}>
            <label>{props.label}</label>
            <input
                type={props.type}
                style={{ color: props.disabled ? "gray" : "white" }}
                placeholder={props.placeholder}
                onChange={handleChange}
                onBlur={handleOnBlur}
                name={props.name}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                value={value}
            />
        </div>
    );
};

export function SettingTimeInput(props) {
    const setUserInfo = useSetRecoilState(updateUserInfo);
    const [timeValue, setTimeValue] = useState(props.value1 ? props.value1 : "");
    const [timeValue2, setTimeValue2] = useState(props.value2 ? props.value2 : "");
    console.log('from:', timeValue);
    console.log('to:', timeValue2);
    const handleOnBlur = (e, name) => {
        const newValue = e.target.value;
        if (timeValue2) {
            if (timeValue < timeValue2) {
                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    [name]: newValue
                }));
            } else {
                props.handleToast(false, 'From time must be less than To time');
            }
        } else {
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                [name]: newValue
            }));
        }
    };
    return (
        <div className={props.class_name}>
            {/* <label>{props.label}</label> */}
            <input
                type='time'
                style={{ color: props.disabled ? "gray" : "white", marginLeft: '10px' }}
                placeholder={props.placeholder}
                onChange={(e) => setTimeValue(e.target.value)}
                name={props.name1}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                onBlur={(e) => handleOnBlur(e, props.name1)}
                value={timeValue}
            />
            <input
                type='time'
                style={{ color: props.disabled ? "gray" : "white" }}
                placeholder={props.placeholder}
                onChange={(e) => setTimeValue2(e.target.value)}
                name={props.name2}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                onBlur={(e) => handleOnBlur(e, props.name2)}
                value={timeValue2}
            />
        </div>
    );
};

export function SettingSelect(props) {

    const [value, setValue] = useState(props.value || "");
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
            [props.name]: newValue
        }));
    };

    const hidtext = value;

    const listItems = props.items.map((item, index) => (
        <option key={index}>{item}</option>
    ));
    return (
        <div className="SettingSelect">
            <label>{props.label}</label>
            <select placeholder="" onBlur={handleOnBlur} name={props.name} disabled={props.disabled}
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
            <SettingCountrySelector disabled={props.disabled} value={props.value} name={props.name} />
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

    const setUserInfo = useSetRecoilState(updateUserInfo);
    const handleOnBlur = (e) => {
        const newValue = e.target.value;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            academicDegree: newValue
        }));
    };

    return (
        <div className="SettingSelect">
            <label>{props.label}</label>
            <select id="dino-select" value={selectedValue} onBlur={handleOnBlur} onChange={handleChange} disabled={props.disabled} style={{ color: props.disabled ? "gray" : "white" }}>
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
    const setUserInfo = useSetRecoilState(updateUserInfo);
    const handleOnBlur = (e) => {
        const newValue = e.target.value;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            specialization: newValue
        }));
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
                onBlur={handleOnBlur}
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
    const lab = {
        color: '#272c34',
        fontWeight: '700',
    }
    const inp = {
        width: 'calc(100% - 85px)',
        borderBottom: '1px solid #3146ff',
        outline: 'none',
        fontWeight: '500',
    }

    return (
        <>
            <div style={{ margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
                {props.children}
                <label style={lab}>{props.label}</label>
                <input style={inp} type={props.type} value={props.value} disabled={props.disabled} />
            </div>
        </>
    );
}

export function AddAccountForm(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.onSubmit) {
            props.onSubmit();
        }
    }
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px', padding: '10px' }} className="relative">
            {props.children}
            <Button type="submit" label={props.label} icon="pi pi-check-circle" className="absolute right-0 bg-[#3146FF] my-2 text-white font-bold rounded-[10px] p-2" />
        </form>
    );
}

export function AddAccountInput(props) {
    const user = props.isFacility ? HealthcareFacilityInfo : userInfo;
    const setUserInfo = useSetRecoilState(user);
    const lab = {
        color: '#fff',
        fontWeight: '700',
    }
    const inp = {
        width: 'calc(100% - 50%)',
        borderBottom: '1px solid #3f4652',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#181a1f',
        color: '#fff'
    }

    const [value, setValue] = useState(props.value || '');
    const handleBlur = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
        if (props.onBlur)
            props.onBlur(event.target.value, setValue);
    };
    return (
        <>
            <div style={{ borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
                <label style={lab}>{props.label}</label>
                <input style={inp}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    name={props.name}
                    disabled={props.disabled}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    value={value}
                    onBlur={handleBlur}
                />
            </div>
        </>
    );
}
export function AddAccountInput2(props) {
    const user = props.isFacility ? HealthcareFacilityInfo : userInfo;
    const setUserInfo = useSetRecoilState(user);

    const lab = {
        color: '#fff',
        fontWeight: '700',
    }
    const inp = {
        width: '100%',
        borderBottom: '1px solid #3f4652',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#181a1f',
        color: '#fff',
        marginTop: '10px'
    }


    const handleBlur = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
        if (props.onBlur)
            props.onBlur(event.target.value);
    };

    const [value, setValue] = useState(props.value || '');
    return (
        <>
            <div style={{ borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                <label style={lab}>{props.label}</label>
                <input style={inp}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    name={props.name}
                    disabled={props.disabled}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    value={value}
                    onBlur={handleBlur}
                />
            </div>
        </>
    );
}

export function AddAccountSelect(props) {
    const user = props.isFacility ? HealthcareFacilityInfo : userInfo;
    const setUserInfo = useSetRecoilState(user);
    const hidtext = props.value;
    const lab = {
        color: '#fff',
        fontWeight: '700',
    }
    const inp = {
        width: 'calc(100% - 50%)',
        borderBottom: '1px solid #3f4652',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#181a1f',
        color: '#fff'
    }
    const handleBlur = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
        if (props.onBlur)
            props.onBlur(event.target.value);
    };

    const listItems = props.items.map((item, index) => (
        <option key={index}>{item}</option>
    ));
    return (
        <div style={{ borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
            <label style={lab}>{props.label}</label>
            <select required={props.required} style={inp} placeholder="" name={props.name} disabled={props.disabled} onBlur={handleBlur}>
                <option disabled selected hidden>{hidtext}</option>
                {listItems}
            </select>
        </div>
    );
};

export function AddAccountCountry(props) {
    const lab = {
        color: '#fff',
        fontWeight: '700',
    }
    return (
        <div style={{ borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
            <label style={lab}>{props.label}</label>
            <AddCountry required={props.required} value={props.value} name={props.name} isFacility={props.isFacility} />
        </div>
    );
};

export function AddAccountCheckbox(props) {
    const lab = {
        color: '#fff',
        fontWeight: '700',
        marginRight: '10px'
    }
    return (
        <div style={{ borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <label style={lab}>{props.label}</label>

            <div style={{ marginTop: '10px' }}>
                <label style={lab}>
                    <input type='checkbox' value={props.value1} name={props.name}
                        onChange={props.onChange1}
                        checked={props.checked1} style={{ marginRight: '6px' }} />{props.ch1}
                </label>

                <label style={lab}>
                    <input type='checkbox' value={props.value2} name={props.name}
                        onChange={props.onChange2}
                        checked={props.checked2} style={{ marginRight: '6px' }} />{props.ch2}
                </label>
            </div>
        </div>
    );
};

export function AddAccountPassport(props) {

    const inp = {
        width: '100%',
        borderBottom: '1px solid #000',
        outline: 'none',
        fontWeight: '500',
        opacity: '0', flex: '1',
    }
    const lab = {
        color: '#000',
        fontWeight: '700',
    }

    // const [selectedFile, setSelectedFile] = useState(null);
    const fileRef = useRef(null);
    const toast = useRef(null);
    const setUserInfo = useSetRecoilState(props.isFacility ? HealthcareFacilityInfo : userInfo);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            return toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Invalid File, Please select an image file' });
        }

        // setSelectedFile(file);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: file
        }));

        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Successful Photo Uploaded' });

    };
    return (
        <div style={{ width: '100%', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
            <Toast ref={toast} />
            <input
                type="file"
                accept="image/*"
                ref={fileRef}
                // className="form-control"
                style={inp}
                onChange={handleFileChange}
            // required
            />
            <div
                style={{ textAlign: 'center', borderRadius: '8px', borderBottom: '1px solid #000', backgroundColor: '#fff', width: '100%', cursor: 'pointer' }}
                onClick={() => {
                    fileRef.current.click();
                }
                }
            >
                <FontAwesomeIcon
                    style={{ marginRight: '4px' }}
                    icon={faUpload}
                />
                <label style={lab}>{props.title}</label>
            </div>
        </div>
    );

};

export function AddAccountSpecialization(props) {
    const lab = {
        color: '#fff',
        fontWeight: '700',
    }
    const inp = {
        width: 'calc(100% - 50%)',
        borderBottom: '1px solid #3f4652',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#181a1f',
        color: '#fff'
    }
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

    const user = props.isFacility ? HealthcareFacilityInfo : userInfo;
    const setUserInfo = useSetRecoilState(user);
    const handleBlur = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
    }
    return (
        <div style={{ borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
            <label style={lab} >{props.label}</label>
            <select
                placeholder={props.placeholder}
                value={selectedValue}
                onChange={handleChange}
                disabled={props.disabled}
                onBlur={handleBlur}
                style={inp}
            >
                <option disabled selected hidden value="" style={{ textAlign: 'left' }}>{props.value}</option>
                {options}
            </select>
        </div>
    );
};

export function AddAccountMedicalDegree(props) {
    const lab = {
        color: '#fff',
        fontWeight: '700',
    }
    const inp = {
        width: 'calc(100% - 50%)',
        borderBottom: '1px solid #3f4652',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#181a1f',
        color: '#fff'
    }
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


    const user = props.isFacility ? HealthcareFacilityInfo : userInfo;
    const setUserInfo = useSetRecoilState(user);
    const handleBlur = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            academicDegree: event.target.value
        }));
    };

    return (
        <div style={{ borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
            <label style={lab}>{props.label}</label>
            <select id="dino-select" value={selectedValue} onChange={handleChange} disabled={props.disabled} style={inp} onBlur={handleBlur}>
                <option disabled selected hidden>{props.value}</option>
                {selectItems}
            </select>
        </div>


    );
};

// =======
export function CreateAccessForm(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.onSubmit) {
            props.onSubmit();
        }
    }
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px', padding: '10px' }} className="relative">
            {props.children}
            <Button type="submit" label={props.label} icon="pi pi-check-circle" className="absolute right-5 bottom-2 bg-[#3146FF] my-2 text-white font-bold rounded-[10px] p-2" />
        </form>
    );
}
export function CreateAccessSelect(props) {

    const hidtext = props.value;

    const inp = {
        width: 'calc(100% - 10%)',
        borderBottom: '1px solid #272c34',
        borderRadius: '8px',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#fff',
        color: '#000',
        margin: '5px auto',
    }

    const listItems = props.items.map((item, index) => (
        <option key={index}>{item}</option>
    ));
    return (
        <div style={{ minHeight: '55px', borderRadius: '8px', width: '100%', padding: '5px', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
            <select required={props.required} style={inp} placeholder="" name={props.name} value={props.value} disabled={props.disabled} onChange={props.onChange && props.onChange}>
                <option disabled selected hidden>{hidtext}</option>
                {listItems}
            </select>
        </div>
    );
};

export function SearchToAccessInput(props) {
    const inp = {
        width: 'calc(100% - 10%)',
        borderBottom: '1px solid #272c34',
        borderRadius: '8px',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#fff',
        color: '#000',
        margin: '0px auto',
        paddingLeft: '10px',
        alignItems: 'center',
    }

    const [value, setValue] = useState(props.value || '');

    const handleChange = (e) => {
        setValue(e.target.value);
        if (props.onChange)
            props.onChange(e.target.value);
    }
    return (
        <>
            <div style={{ position: 'relative', borderRadius: '8px', height: '45px', width: '100%', padding: '5px', margin: '15px 5px', display: 'flex', justifyContent: 'space-between' }}>
                <input style={inp}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={handleChange}
                    name={props.name}
                    disabled={props.disabled}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    value={value}
                />
                {/* <span style={{position:'absolute'}}><AiOutlineSearch /></span> */}
            </div>
        </>
    );
};

// ========
export function AddAccessKeyInput(props) {
    // const lab = {
    //     color: '#fff',
    //     fontWeight: '700',
    // }
    const inp = {
        width: 'calc(100% - 0%)',
        borderBottom: '1px solid #3f4652',
        outline: 'none',
        fontWeight: '500',
        backgroundColor: '#181a1f',
        color: '#fff',
        height: '5vh',
        borderRadius: '5px',
        paddingLeft: '5px',
        display: props.isShow ? 'block' : 'none'

    }

    const [value, setValue] = useState(props.value || '');
    const handleOnChange = (e) => {
        setValue(e.target.value);
        if (props.onChange)
            props.onChange(e.target.value);
    }
    return (
        <>
            <div style={{ borderRadius: '8px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                {/* <label style={lab}>{props.label}</label> */}
                <input style={inp}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={handleOnChange}
                    name={props.name}
                    disabled={props.disabled}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    value={value}
                />
            </div>
        </>
    );
}

// ========
export function DynamicRecordInput(props) {
    const lab = {
        color: '#272c34',
        fontWeight: '700',
    }
    const inp = {
        width: 'calc(100% - 0px)',
        borderBottom: '1px solid #3146ff',
        outline: 'none',
        fontWeight: '500',
    }

    return (
        <>
            <div style={{ width: '100%', margin: '10px 5px', display: 'flex', justifyContent: 'space-between' }}>
                {props.children}
                <input style={inp} type={props.type} value={props.value} disabled={props.disabled} />
            </div>
        </>
    );
}