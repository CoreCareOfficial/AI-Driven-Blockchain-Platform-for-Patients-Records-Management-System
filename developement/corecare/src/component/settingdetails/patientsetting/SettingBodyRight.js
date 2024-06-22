import React, { useState } from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { PiNumberOneFill } from "react-icons/pi";
import { PiNumberSquareTwoFill } from "react-icons/pi";
import { PiNumberThreeFill } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import { Card } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { SettingForm, SettingInput } from "../TextFormSetting";
import { CiCirclePlus } from "react-icons/ci";

function SettingBodyRight(props, { handleAddContact }) {
    const icons = [
        { 'num': <PiNumberOneFill /> },
        { 'num': <PiNumberSquareTwoFill /> },
        { 'num': <PiNumberThreeFill /> }
    ]
    const usercontact = [
        { id: 1, 'name': "ahmed qahtan" },
        { id: 2, 'name': "ahmed qahtan" },
    ]

    const [TimeFrom, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [times, setTimes] = useState([]);

    const handleAddTime = () => {
        if (TimeFrom !=='' && to !=='') {
            if (to > TimeFrom) {
        const newTime = {
            TimeFrom,
            to,
        };
        setTimes([...times, newTime]);
        setFrom('');
        setTo('');
    } alert("choose correct time");}
    alert("Choose time!");
    };

    const [WorkFrom, setWorkFrom] = useState('');
    const [WorkTo, setWorkTo] = useState('');
    const [WorkTimes, setWorkTimes] = useState([]);

    const handleAddWorkTime = () => {
        if (TimeFrom !=='' && to !=='') {
            if (to > TimeFrom) {
        const newWorkTime = {
            TimeFrom,
            to,
        };
        setWorkTimes([...WorkTimes, newWorkTime]);
        setFrom('');
        setTo('');
    } alert("choose correct time");}
    alert("Choose time!");
    };
    console.log(times);
    
    const [WorkHours, setWorkHours] = useState(true);
    const toggleEditWorkHours = () => {
        setWorkHours(!WorkHours);
    };

    const [VisitHours, setVisitHours] = useState(true);
    const toggleEditVisitHours = () => {
        setVisitHours(!VisitHours);
    };

    return (
        <>
            <DynamicCard name="SettingBodyRight">
                {props.userType === "Doctor" || props.userType === "Patient" ? (
                    <DynamicCard name="UserContact">
                        <Card.Title style={{
                            color: 'white',
                            fontSize: '1.2em',
                            fontWeight: '500',
                            fontFamily: 'DM Sans'
                        }}>Emergency Contact</Card.Title>
                        {
                            usercontact.map((EmergencyContact) => (
                                <div style={{
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    textAlign: 'center',
                                    alignItems: 'center'
                                }}>
                                    <span>

                                        <PiNumberOneFill />
                                    </span>
                                    <Card.Text>{EmergencyContact['name']}</Card.Text>
                                    <span>
                                        {/* event */}
                                        <TbTrashXFilled />
                                    </span>
                                </div>
                            ))
                        }
                        <IoMdPersonAdd style={{
                            color: 'white',
                            fontSize: '1.3em',
                            cursor: 'pointer',
                            display: usercontact.length <= 2 ? 'block' : 'none'
                        }} onClick={usercontact.length <= 2 && handleAddContact} />

                    </DynamicCard>
                ) : null}

                {props.userType === "Doctor" || props.userType === "Laboratory" || props.userType === "Radiology" || props.userType === "Hospital" ? (

                    <SettingForm name="SettingForm_form" legend="Work Hours" btn="Add Time" show={WorkHours} TheEvent={toggleEditWorkHours}>
                        <span style={{
                            color: 'white',
                            position: 'absolute', right: '40px', top: '-15px',
                            fontSize: '1.3em',
                            borderRadius: '20px',
                            padding: '5px',
                            backgroundColor: '#272c34',
                            cursor: 'pointer',
                        }} onClick={toggleEditWorkHours}
                        ><MdModeEdit /></span>
                        <span style={{
                            color: 'white',
                            position: 'absolute', right: '15px', top: '150px',
                            fontSize: '1.3em',
                            borderRadius: '20px',
                            padding: '5px',
                            backgroundColor: '#272c34',
                            cursor: 'pointer',
                            display: WorkHours ? "none" :"block",
                        }} onClick={handleAddWorkTime}
                        ><CiCirclePlus /></span>
                        {props.userType === "Doctor" ? (
                            <SettingInput class_name="SettingInput" type="text" name="Facility Name" label="Facility Name:" placeholder="" disabled={WorkHours} />
                        ) : null}
                        <SettingInput class_name="SettingInput" type="text" name="Days" label="Days :" placeholder="Separated with ," disabled={WorkHours} />
                        <SettingInput class_name="SettingInput" type="time" value={WorkFrom} name="From " label="From :" onChange={(e) => setWorkFrom(e.target.value)} placeholder="" disabled={WorkHours} />
                        <SettingInput class_name="SettingInput" type="time" value={WorkTo} name="To " label="To :" onChange={(e) => setWorkTo(e.target.value)} placeholder="" disabled={WorkHours} />
                    </SettingForm>
                ) : null}

                {props.userType === "Hospital" ? (
                    <SettingForm name="SettingForm_form" legend="Visit Hours" btn="Add Time" show={VisitHours} TheEvent={toggleEditVisitHours}>
                        <span style={{
                            color: 'white',
                            position: 'absolute', right: '40px', top: '-15px',
                            fontSize: '1.3em',
                            borderRadius: '20px',
                            padding: '5px',
                            backgroundColor: '#272c34',
                            cursor: 'pointer',
                        }} onClick={toggleEditVisitHours}
                        ><MdModeEdit /></span>
                        <span style={{
                            color: 'white',
                            position: 'absolute', right: '15px', top: '150px',
                            fontSize: '1.3em',
                            borderRadius: '20px',
                            padding: '5px',
                            backgroundColor: '#272c34',
                            cursor: 'pointer',
                            display: VisitHours ? "none" :"block",
                        }} onClick={handleAddTime}
                        ><CiCirclePlus /></span>
                        <SettingInput class_name="SettingInput" type="text"  name="Days" label="Days :" placeholder="Separated with ," disabled={VisitHours} />
                        <SettingInput class_name="SettingInput" type="time" value={TimeFrom} name="From " label="From :" onChange={(e) => setFrom(e.target.value)} placeholder="" disabled={VisitHours} />
                        <SettingInput class_name="SettingInput" type="time" value={to} name="To " label="To :" onChange={(e) => setTo(e.target.value)} placeholder="" disabled={VisitHours} />
                    </SettingForm>
                ) : null}

            </DynamicCard>
        </>
    );

}
export default SettingBodyRight;