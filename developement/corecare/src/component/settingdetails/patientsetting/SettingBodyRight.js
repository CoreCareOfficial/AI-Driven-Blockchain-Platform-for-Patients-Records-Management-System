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
    const visitHours = Array.isArray(props.visitHours) ? props.visitHours : [];
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

    const [editWorkHours, setEditWorkHours] = useState({});
    const toggleEditWorkHours = (id) => {
        setEditWorkHours((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
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
        display: WorkHoursShow ? "block" : "none",
    };
    const spanWorkHours2 = {
        color: 'white',
        position: 'absolute', right: '15px', bottom: '4%',
        fontSize: '1.3em',
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: '#272c34',
        cursor: 'pointer',
        display: WorkHoursShow ? "none" : "block",
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
                            const dayworkHours = workHour.DayworkHours.trim();
                            const [startTime, endTime] = dayworkHours.split(' - ');
                            const NightworkHours = workHour.NightworkHours.trim();
                            const [startTimeN, endTimeN] = NightworkHours.split(' - ');

                            const formatTime = (time) => time.split(':').slice(0, 2).join(':');
                            const formattedStartTime = formatTime(startTime);
                            const formattedEndTime = formatTime(endTime);
                            const formattedStartTimeN = formatTime(startTimeN);
                            const formattedEndTimeN = formatTime(endTimeN);

                            const isEditing = !!editWorkHours[workHour.id];

                            return (
                                <SettingForm key={workHour.id} name="SettingForm_form" legend="Work Hours" btn="Add Time" show={!isEditing} TheEvent={() => toggleEditWorkHours(workHour.id)}>
                                    <span style={spanWorkHours1} onClick={() => toggleEditWorkHours(workHour.id)}>
                                        <MdModeEdit />
                                    </span>
                                    {/* <span style={spanWorkHours2} onClick={handleAddWorkTime}>
                                        <CiCirclePlus />
                                    </span> */}
                                    {props.userType === "Doctor" ? (
                                        <SettingInput class_name="SettingInput" type="text" name="Facility Name" label="Facility Name:" placeholder="" disabled={!isEditing} value={workHour.hospitalName} />
                                    ) : null}
                                    <SettingInput class_name="SettingInput" type="text" name="Days" label="Days :" placeholder="Separated with ," disabled={!isEditing} value={workHour.workDays} />
                                    {dayworkHours &&
                                        <>
                                            <SettingTimeInput class_name="SettingInput" value={formattedStartTime} name="From " label="From :" placeholder="" disabled={!isEditing} />
                                            <SettingTimeInput class_name="SettingInput" value={formattedEndTime} name="To " label="To :" placeholder="" disabled={!isEditing} />
                                        </>
                                    }
                                    {NightworkHours &&
                                        <>
                                            <SettingTimeInput class_name="SettingInput" value={formattedStartTimeN} name="From " label="From :" placeholder="" disabled={!isEditing} />
                                            <SettingTimeInput class_name="SettingInput" value={formattedEndTimeN} name="To " label="To :" placeholder="" disabled={!isEditing} />
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
                    <>
                        {visitHours.map((workHour, index) => {
                            const dayworkHours = workHour.DayvisitHours.trim();
                            const [startTime, endTime] = dayworkHours.split(' - ');
                            const NightworkHours = workHour.NightvisitHours.trim();
                            const [startTimeN, endTimeN] = NightworkHours.split(' - ');

                            const formatTime = (time) => time.split(':').slice(0, 2).join(':');
                            const formattedStartTime = formatTime(startTime);
                            const formattedEndTime = formatTime(endTime);
                            const formattedStartTimeN = formatTime(startTimeN);
                            const formattedEndTimeN = formatTime(endTimeN);

                            return (
                                <SettingForm key={index} name="SettingForm_form" legend="Visit Hours" btn="Add Time" show={VisitHours} TheEvent={toggleEditVisitHours}>
                                    <span style={spanWorkHours1} onClick={toggleEditVisitHours}>
                                        <MdModeEdit />
                                    </span>
                                    {/* <span style={spanWorkHours2} onClick={handleAddWorkTime}>
                                        <CiCirclePlus />
                                    </span> */}
                                    {props.userType === "Doctor" ? (
                                        <SettingInput class_name="SettingInput" type="text" name="Facility Name" label="Facility Name:" placeholder="" disabled={VisitHours} value={workHour.hospitalName} />
                                    ) : null}
                                    <SettingInput class_name="SettingInput" type="text" name="Days" label="Days :" placeholder="Separated with ," disabled={VisitHours} value={workHour.workDays} />
                                    {dayworkHours &&
                                        <>
                                            <SettingTimeInput class_name="SettingInput" value={formattedStartTime} name="From " label="From :" placeholder="" disabled={VisitHours} />
                                            <SettingTimeInput class_name="SettingInput" value={formattedEndTime} name="To " label="To :" placeholder="" disabled={VisitHours} />
                                        </>
                                    }
                                    {NightworkHours &&
                                        <>
                                            <SettingTimeInput class_name="SettingInput" value={formattedStartTimeN} name="From " label="From :" placeholder="" disabled={VisitHours} />
                                            <SettingTimeInput class_name="SettingInput" value={formattedEndTimeN} name="To " label="To :" placeholder="" disabled={VisitHours} />
                                        </>
                                    }
                                </SettingForm>
                            );
                        })}

                        <SettingForm name="SettingForm_form" legend="New Visit Hours" btn="Add Time" show={VisitHours} TheEvent={toggleEditVisitHours}>
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
            </DynamicCard>
        </>
    );
}
export default SettingBodyRight;
