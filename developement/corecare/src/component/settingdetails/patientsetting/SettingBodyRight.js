import React, { useState } from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { PiNumberOneFill, PiNumberSquareTwoFill, PiNumberThreeFill } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import { Card } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { SettingForm, SettingInput, SettingTimeInput } from "../TextFormSetting";
import { CiCirclePlus } from "react-icons/ci";

function SettingBodyRight(props) {
    const emergencyContacts = props.emergencyContact ? props.emergencyContact : [];
    const workHours = Array.isArray(props.workHours) ? props.workHours : [];
    const icons = {
        1: <PiNumberOneFill />,
        2: <PiNumberSquareTwoFill />,
        3: <PiNumberThreeFill />
    };
    const usercontact = [
        { id: 1, 'name': "ahmed qahtan" },
        { id: 2, 'name': "ahmed qahtan" },
    ];

    const [TimeFrom, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [times, setTimes] = useState([]);

    const handleAddTime = () => {
        if (TimeFrom !== '' && to !== '') {
            if (to > TimeFrom) {
                const newTime = {
                    TimeFrom,
                    to,
                };
                setTimes([...times, newTime]);
                setFrom('');
                setTo('');
            } else {
                alert("Choose correct time");
            }
        } else {
            alert("Choose time!");
        }
    };

    const [WorkFrom, setWorkFrom] = useState('');
    const [WorkTo, setWorkTo] = useState('');
    const [WorkTimes, setWorkTimes] = useState([]);

    const handleAddWorkTime = () => {
        if (WorkFrom !== '' && WorkTo !== '') {
            if (WorkTo > WorkFrom) {
                const newWorkTime = {
                    WorkFrom,
                    WorkTo,
                };
                setWorkTimes([...WorkTimes, newWorkTime]);
                setWorkFrom('');
                setWorkTo('');
            } else {
                alert("Choose correct time");
            }
        } else {
            alert("Choose time!");
        }
    };
    console.log(times);

    const [WorkHours, setWorkHours] = useState(true);
    const toggleEditWorkHours = () => {
        setWorkHours(!WorkHours);
    };

    const [WorkHoursShow, setWorkHoursShow] = useState(true);
    const toggleEditWorkHoursShow = () => {
        setWorkHoursShow(!WorkHoursShow);
    };

    const [VisitHours, setVisitHours] = useState(true);
    const toggleEditVisitHours = () => {
        setVisitHours(!VisitHours);
    };

    const spanWorkHours1 = {
        color: 'white',
        position: 'absolute', right: '40px', top: '-15px',
        fontSize: '1.3em',
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: '#272c34',
        cursor: 'pointer',
    };
    const spanWorkHourShow = {
        color: 'white',
        position: 'absolute', right: '50px', bottom: '10%',
        fontSize: '1.3em',
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: '#272c34',
        cursor: 'pointer',
        display: WorkHoursShow ? "block": "none" ,

    };
    const spanWorkHours2 = {
        color: 'white',
        position: 'absolute', right: '15px', bottom: '4%',
        fontSize: '1.3em',
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: '#272c34',
        cursor: 'pointer',
        display: WorkHours ? "none" : "block",
    };
    const spanNewWorkHours = {
        color: 'white',
        position: 'absolute', right: '15px', bottom: '10%',
        fontSize: '1.3em',
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: '#272c34',
        cursor: 'pointer',
        display: WorkHoursShow ? "none" : "block",
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
                            emergencyContacts.map((EmergencyContact, index) => (
                                <div key={index} style={{
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    textAlign: 'center',
                                    alignItems: 'center'
                                }}>
                                    <span>
                                        {icons[index + 1]}
                                    </span>
                                    <Card.Text>{EmergencyContact}</Card.Text>
                                    <span>
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
                        }} onClick={usercontact.length <= 2 && props.handleAddContact} />

                    </DynamicCard>
                ) : null}

                {props.userType === "Doctor" || props.userType === "Laboratory" || props.userType === "Radiology" || props.userType === "Hospital" || props.userType === "Pharmacy" ? (
                    <>
                        {workHours.map((workHour, index) => {
                            // Trim and split DayworkHours into start and end times
                            const dayworkHours = workHour.DayworkHours.trim();
                            const [startTime, endTime] = dayworkHours.split(' - ');
                            const NightworkHours = workHour.NightworkHours.trim();
                            const [startTimeN, endTimeN] = NightworkHours.split(' - ');

                            // Debugging statements
                            console.log("DayworkHours:", dayworkHours);
                            console.log("Start Time:", startTime);
                            console.log("End Time:", endTime);
                            console.log("NightworkHours:", NightworkHours);
                            console.log("Start TimeN:", startTimeN);
                            console.log("End TimeN:", endTimeN);

                            // Ensure startTime and endTime are properly formatted
                            const formatTime = (time) => time.split(':').slice(0, 2).join(':');
                            const formattedStartTime = formatTime(startTime);
                            const formattedEndTime = formatTime(endTime);
                            const formattedStartTimeN = formatTime(startTimeN);
                            const formattedEndTimeN = formatTime(endTimeN);

                            return (
                                <SettingForm key={index} name="SettingForm_form" legend="Work Hours" btn="Add Time" show={WorkHours} TheEvent={toggleEditWorkHours}>
                                    <span style={spanWorkHours1} onClick={toggleEditWorkHours}>
                                        <MdModeEdit />
                                    </span>
                                    <span style={spanWorkHours2} onClick={handleAddWorkTime}>
                                        <CiCirclePlus />
                                    </span>
                                    {props.userType === "Doctor" ? (
                                        <SettingInput class_name="SettingInput" type="text" name="Facility Name" label="Facility Name:" placeholder="" disabled={WorkHours} value={workHour.hospitalName} />
                                    ) : null}
                                    <SettingInput class_name="SettingInput" type="text" name="Days" label="Days :" placeholder="Separated with ," disabled={WorkHours} value={workHour.workDays} />
                                    {/* Use the split values for From and To */}
                                    {dayworkHours &&
                                        <>
                                            <SettingTimeInput class_name="SettingInput" value={formattedStartTime} name="From " label="From :" placeholder="" disabled={WorkHours} />
                                            <SettingTimeInput class_name="SettingInput" value={formattedEndTime} name="To " label="To :" placeholder="" disabled={WorkHours} />
                                        </>
                                    }
                                    {NightworkHours &&
                                        <>
                                            <SettingTimeInput class_name="SettingInput" value={formattedStartTimeN} name="From " label="From :" placeholder="" disabled={WorkHours} />
                                            <SettingTimeInput class_name="SettingInput" value={formattedEndTimeN} name="To " label="To :" placeholder="" disabled={WorkHours} />
                                        </>
                                    }
                                </SettingForm>
                            );
                        })}

                        <SettingForm name="SettingForm_form" legend="New Work Hours" btn="Add Time" show={WorkHoursShow} TheEvent={toggleEditWorkHoursShow}>
                            <span style={spanWorkHourShow} onClick={toggleEditWorkHoursShow}
                            ><CiCirclePlus /></span>
                            <span style={spanNewWorkHours} onClick={handleAddWorkTime}
                            ><CiCirclePlus /></span>

                            {!WorkHoursShow ? (
                                <>
                                {props.userType === "Doctor" ? (
                                    <SettingInput class_name="SettingInput" type="text" name="Facility Name" label="Facility Name:" placeholder="" />
                                ) : null}
                                    <SettingInput class_name="SettingInput" type="text" name="Days" label="Days :" placeholder="Separated with ," />
                                    <SettingInput class_name="SettingInput" type="time" value={WorkFrom} name="From " label="From :" onChange={(e) => setWorkFrom(e.target.value)} placeholder="" />
                                    <SettingInput class_name="SettingInput" type="time" value={WorkTo} name="To " label="To :" onChange={(e) => setWorkTo(e.target.value)} placeholder="" />
                                </>
                            ) : null}
                        
                        </SettingForm>
                    </>
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
                            display: VisitHours ? "none" : "block",
                        }} onClick={handleAddTime}
                        ><CiCirclePlus /></span>
                        <SettingInput class_name="SettingInput" type="text" name="Days" label="Days :" placeholder="Separated with ," disabled={VisitHours} />
                        <SettingInput class_name="SettingInput" type="time" value={TimeFrom} name="From " label="From :" onChange={(e) => setFrom(e.target.value)} placeholder="" disabled={VisitHours} />
                        <SettingInput class_name="SettingInput" type="time" value={to} name="To " label="To :" onChange={(e) => setTo(e.target.value)} placeholder="" disabled={VisitHours} />
                    </SettingForm>
                ) : null}

            </DynamicCard>
        </>
    );
}
export default SettingBodyRight;
