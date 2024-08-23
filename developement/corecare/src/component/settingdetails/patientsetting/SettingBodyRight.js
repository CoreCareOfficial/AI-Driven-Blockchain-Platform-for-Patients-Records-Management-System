import React, { useEffect, useRef, useState } from "react";
import DynamicCard from '../../bootcomponent/DynamicCard';
import { PiNumberOneFill, PiNumberSquareTwoFill, PiNumberThreeFill } from "react-icons/pi";
import { TbTrashXFilled } from "react-icons/tb";
import { Card } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { SettingForm, SettingInput, SettingTimeInput } from "../TextFormSetting";
import { CiCirclePlus } from "react-icons/ci";
import { Toast } from "primereact/toast";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../../../Recoil/Atom";
import { updateUserInfo } from "../../../Recoil/UpdateData";
import ConfirmedDialog from "../../../utiles/ConfirmedDialog";
import dotenv from 'dotenv';
dotenv.config();
const SERVER_URL = process.env.SERVER_URL;

function SettingBodyRight(props) {
    const [isConfirm, setIsConfirm] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [handle, setHandle] = useState(null);

    const handleConfirm = () => {
        setIsConfirm(!isConfirm);
    };
    // let emergencyContacts = props.emergencyContact ? props.emergencyContact : [];
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const workHours = Array.isArray(props.workHours) ? props.workHours : [];
    const visitHours = Array.isArray(props.visitHours) ? props.visitHours : [];
    const toast = useRef(null);

    useEffect(() => {
        if (props.emergencyContact) {
            setEmergencyContacts(props.emergencyContact);
        }
    }, [props.emergencyContact]);

    // const [emergencyContact, setEmergencyContact] = useState(emergencyContacts)
    const icons = {
        1: <PiNumberOneFill />,
        2: <PiNumberSquareTwoFill />,
        3: <PiNumberThreeFill />
    };

    const handleToast = (isAdded, message) => {
        // setIsAdded();
        isAdded ?
            toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 })
            :
            toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };


    const loginInfoValue = useRecoilValue(loginInfo);
    const updateUserInfoValue = useRecoilValue(updateUserInfo);
    const [editWorkHours, setEditWorkHours] = useState({});
    const [editVisitHours, setEditVisitHours] = useState({});
    const toggleEditWorkHours = async (id) => {

        if (!id) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'ID is required' });
            return;
        }
        if (!updateUserInfoValue.DayworkHoursFrom && !updateUserInfoValue.DayworkHoursTo && !updateUserInfoValue.NightworkHoursFrom && !updateUserInfoValue.NightworkHoursTo) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill all fields Correctly' });
            return;
        }
        console.log('updateUserInfoValue:', updateUserInfoValue.NightworkHoursFrom)
        const DayworkHours = `${updateUserInfoValue.DayworkHoursFrom} - ${updateUserInfoValue.DayworkHoursTo}`;
        const NightworkHours = `${updateUserInfoValue.NightworkHoursFrom} - ${updateUserInfoValue.NightworkHoursTo}`;
        const data = {
            hospitalName: updateUserInfoValue.hospitalName,
            workDays: updateUserInfoValue.workDays,
            DayworkHours,
            NightworkHours,
        };
        console.log('data:', data);
        try {
            const response = await fetch(`${SERVER_URL}/workhours/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Work Day and Work Hours updated successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Work Day and Work Hours updated successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Work Day and Work Hours updated' });
        }

        setEditWorkHours((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const [WorkHoursShow, setWorkHoursShow] = useState(true);
    const [VisitHoursShow, setVisitHoursShow] = useState(true);
    const toggleEditWorkHoursShow = async () => {
        if (!updateUserInfoValue.DayworkHoursFrom && !updateUserInfoValue.DayworkHoursTo && !updateUserInfoValue.NightworkHoursFrom && !updateUserInfoValue.NightworkHoursTo) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill all fields Correctly' });
            return;
        }
        console.log('updateUserInfoValue:', updateUserInfoValue.NightworkHoursFrom)
        const DayworkHours = `${updateUserInfoValue.DayworkHoursFrom} - ${updateUserInfoValue.DayworkHoursTo}`;
        const NightworkHours = `${updateUserInfoValue.NightworkHoursFrom} - ${updateUserInfoValue.NightworkHoursTo}`;
        const data = {
            email: loginInfoValue.login,
            hospitalName: updateUserInfoValue.hospitalName,
            workDays: updateUserInfoValue.workDays,
            DayworkHours,
            NightworkHours,
        };
        console.log('data:', data);
        try {
            const response = await fetch(`${SERVER_URL}/workhours`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Work Day and Work Hours added successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Work Day and Work Hours added successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Work Day and Work Hours added' });
        }
        setWorkHoursShow(!WorkHoursShow);
    };

    const toggleEditVisitHours = async (id) => {
        if (!id) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'ID is required' });
            return;
        }
        if (!updateUserInfoValue.DayvisitHoursFrom && !updateUserInfoValue.DayvisitHoursTo && !updateUserInfoValue.NightvisitHoursFrom && !updateUserInfoValue.NightvisitHoursTo) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill all fields Correctly' });
            return;
        }
        console.log('updateUserInfoValue:', updateUserInfoValue.NightworkHoursFrom)
        const DayworkHours = `${updateUserInfoValue.DayvisitHoursFrom} - ${updateUserInfoValue.DayvisitHoursTo}`;
        const NightworkHours = `${updateUserInfoValue.NightvisitHoursFrom} - ${updateUserInfoValue.NightvisitHoursTo}`;
        const data = {
            hospitalName: updateUserInfoValue.hospitalNameVisit,
            visitDays: updateUserInfoValue.visitDays,
            DayvisitHours: DayworkHours,
            NightvisitHours: NightworkHours,
        };
        console.log('data:', data);
        try {
            const response = await fetch(`${SERVER_URL}/visithours/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Visit Day and Visit Hours updated successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Visit Day and Visit Hours updated successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Visit Day and Visit Hours updated' });
        }

        setEditVisitHours((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleAddVisitTime = async () => {
        if (!updateUserInfoValue.DayvisitHoursFrom && !updateUserInfoValue.DayvisitHoursTo && !updateUserInfoValue.NightvisitHoursFrom && !updateUserInfoValue.NightvisitHoursTo) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill all fields Correctly' });
            return;
        }
        console.log('updateUserInfoValue:', updateUserInfoValue.NightworkHoursFrom)
        const DayvisitHours = `${updateUserInfoValue.DayvisitHoursFrom} - ${updateUserInfoValue.DayvisitHoursTo}`;
        const NightvisitHours = `${updateUserInfoValue.NightvisitHoursFrom} - ${updateUserInfoValue.NightvisitHoursTo}`;
        const data = {
            email: loginInfoValue.login,
            hospitalName: updateUserInfoValue.hospitalNameVisit,
            visitDays: updateUserInfoValue.visitDays,
            DayvisitHours,
            NightvisitHours,
        };
        console.log('data:', data);
        try {
            const response = await fetch(`${SERVER_URL}/visithours`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Visit Day and Visit Hours added successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Visit Day and Visit Hours added successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Visit Day and Visit Hours added' });
        }
        setVisitHoursShow(!VisitHoursShow);
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
    const spanVisitHourShow = {
        color: 'white',
        position: 'absolute', right: '50px', bottom: '10%',
        fontSize: '1.3em',
        borderRadius: '20px',
        padding: '5px',
        backgroundColor: '#272c34',
        cursor: 'pointer',
        display: VisitHoursShow ? "block" : "none",
    };

    const handleDeleteEmergency = async (id) => {
        setIsConfirm(false);
        if (!id) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'ID is required' });
            return;
        }
        const newEmergencyContacts = emergencyContacts.filter((EmergencyContact) => EmergencyContact.id !== id);
        setEmergencyContacts(newEmergencyContacts);
        try {
            const response = await fetch(`${SERVER_URL}/emergencycontacts/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("res = " + response);
            const jsonData = await response.json();
            console.log('message from server: ' + jsonData.message);
            if (jsonData.message === "Emergency Contact Deleted Successfully") {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Emergency Contact Deleted Successfully' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: jsonData.message });
            }
        } catch (error) {
            console.error(error.message);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error Emergency Contact Deleted' });
        }

    }
    const handleDeleteEmergencyContact = async (id) => {
        setIsConfirm(!isConfirm);
        setTitle('Delete Emergency Contact');
        setMessage('Are You Sure You Want To Delete Emergency Contact?');
        setHandle(() => handleDeleteEmergency.bind(this, id));
    };


    return (
        <>
            <Toast ref={toast} />
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
                                <div key={EmergencyContact.id} style={{
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    textAlign: 'center',
                                    alignItems: 'center'
                                }}>
                                    <span>
                                        {icons[index + 1]}
                                    </span>
                                    <Card.Text>{EmergencyContact.name}</Card.Text>
                                    <span>
                                        <TbTrashXFilled style={{ cursor: "pointer" }} onClick={() => handleDeleteEmergencyContact(EmergencyContact.id)} />
                                    </span>
                                </div>
                            ))
                        }
                        <IoMdPersonAdd style={{
                            color: 'white',
                            fontSize: '1.3em',
                            cursor: 'pointer',
                            display: emergencyContacts.length <= 2 ? 'block' : 'none'
                        }} onClick={(emergencyContacts.length <= 2) && props.handleAddContact} />
                    </DynamicCard>
                ) : null}

                {props.userType === "Doctor" || props.userType === "Laboratory" || props.userType === "Radiology" || props.userType === "Hospital" || props.userType === "Pharmacy" ? (
                    <>
                        {workHours.map((workHour) => {
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
                                <SettingForm key={workHour.id} name="SettingForm_form" legend="Work Hours" btn="Update Time" show={!isEditing} TheEvent={() => toggleEditWorkHours(workHour.id)}>
                                    <span style={spanWorkHours1} onClick={() => setEditWorkHours((prevState) => ({
                                        ...prevState,
                                        [workHour.id]: !prevState[workHour.id],
                                    }))}>
                                        <MdModeEdit />
                                    </span>
                                    {props.userType === "Doctor" ? (
                                        <SettingInput class_name="SettingInput" type="text" name="hospitalName" label="Facility Name:" placeholder="" disabled={!isEditing} value={workHour.hospitalName} />
                                    ) : null}
                                    <SettingInput class_name="SettingInput" type="text" name="workDays" label="Days :" placeholder='Separated with " - "' disabled={!isEditing} value={workHour.workDays} />
                                    {dayworkHours &&
                                        <>
                                            <label style={{ color: '#ffffff', marginLeft: '5px' }}>Morning Period</label>
                                            <SettingTimeInput handleToast={handleToast} class_name="SettingInput" name1="DayworkHoursFrom" name2='DayworkHoursTo' value1={formattedStartTime} value2={formattedEndTime} disabled={!isEditing} />
                                        </>
                                    }
                                    {NightworkHours &&
                                        <>
                                            <label style={{ color: '#ffffff', marginLeft: '5px' }}>Evening Period</label>
                                            <SettingTimeInput handleToast={handleToast} class_name="SettingInput" name1="NightworkHoursFrom" name2='NightworkHoursTo' value1={formattedStartTimeN} value2={formattedEndTimeN} disabled={!isEditing} />
                                        </>
                                    }
                                </SettingForm>
                            );
                        })}

                        <SettingForm name="SettingForm_form" legend="New Work Hours" btn="Add Time" show={WorkHoursShow} TheEvent={toggleEditWorkHoursShow}>
                            <span style={spanWorkHourShow} onClick={() => setWorkHoursShow(!WorkHoursShow)}
                            ><CiCirclePlus /></span>

                            {!WorkHoursShow ? (
                                <>
                                    {props.userType === "Doctor" ? (
                                        <SettingInput class_name="SettingInput" type="text" name="hospitalName" label="Facility Name:" placeholder="" />
                                    ) : null}
                                    <SettingInput class_name="SettingInput" type="text" name="workDays" label="Days :" placeholder='Separated with " - "' />
                                    <label style={{ color: '#ffffff', marginLeft: '5px' }}>Morning Period</label>
                                    <SettingTimeInput handleToast={handleToast} class_name="SettingInput" name1="DayworkHoursFrom" name2='DayworkHoursTo' placeholder="" />
                                    <label style={{ color: '#ffffff', marginLeft: '5px' }}>Evening Period</label>
                                    <SettingTimeInput handleToast={handleToast} class_name="SettingInput" name1="NightworkHoursFrom" name2='NightworkHoursTo' placeholder="" />
                                </>
                            ) : null}
                        </SettingForm>
                    </>
                ) : null}

                {props.userType === "Hospital" ? (
                    <>
                        {visitHours.map((workHour) => {
                            const dayworkHours = workHour.DayvisitHours.trim();
                            const [startTime, endTime] = dayworkHours.split(' - ');
                            const NightworkHours = workHour.NightvisitHours.trim();
                            const [startTimeN, endTimeN] = NightworkHours.split(' - ');

                            const formatTime = (time) => time.split(':').slice(0, 2).join(':');
                            const formattedStartTime = formatTime(startTime);
                            const formattedEndTime = formatTime(endTime);
                            const formattedStartTimeN = formatTime(startTimeN);
                            const formattedEndTimeN = formatTime(endTimeN);

                            const isEditing = !!editVisitHours[workHour.id];

                            return (
                                <SettingForm key={workHour.id} name="SettingForm_form" legend="Visit Hours" btn="Update Time" show={!isEditing} TheEvent={() => toggleEditVisitHours(workHour.id)}>
                                    <span style={spanWorkHours1} onClick={() => setEditVisitHours((prevState) => ({
                                        ...prevState,
                                        [workHour.id]: !prevState[workHour.id],
                                    }))}>
                                        <MdModeEdit />
                                    </span>
                                    <SettingInput class_name="SettingInput" type="text" name="visitDays" label="Days :" placeholder='Separated with " - "' disabled={!isEditing} value={workHour.visitDays} />
                                    {dayworkHours &&
                                        <>
                                            <label style={{ color: '#ffffff', marginLeft: '5px' }}>Morning Period</label>
                                            <SettingTimeInput class_name="SettingInput" value1={formattedStartTime} name1="DayvisitHoursFrom" value2={formattedEndTime} name2="DayvisitHoursTo" disabled={!isEditing} />
                                        </>
                                    }
                                    {NightworkHours &&
                                        <>
                                            <label style={{ color: '#ffffff', marginLeft: '5px' }}>Evening Period</label>
                                            <SettingTimeInput class_name="SettingInput" value1={formattedStartTimeN} name1="NightvisitHoursFrom" value2={formattedEndTimeN} name2="NightvisitHoursTo" label="From :" placeholder="" disabled={!isEditing} />
                                        </>
                                    }
                                </SettingForm>
                            );
                        })}

                        <SettingForm name="SettingForm_form" legend="New Visit Hours" btn="Add Time" show={VisitHoursShow} TheEvent={handleAddVisitTime}>
                            <span style={spanVisitHourShow} onClick={() => setVisitHoursShow(!VisitHoursShow)}
                            ><CiCirclePlus /></span>

                            {!VisitHoursShow ? (
                                <>
                                    <SettingInput class_name="SettingInput" type="text" name="visitDays" label="Days :" placeholder='Separated with " - "' />
                                    <label style={{ color: '#ffffff', marginLeft: '5px' }}>Morning Period</label>
                                    <SettingTimeInput handleToast={handleToast} class_name="SettingInput" name1="DayvisitHoursFrom" name2='DayvisitHoursTo' />
                                    <label style={{ color: '#ffffff', marginLeft: '5px' }}>Evening Period</label>
                                    <SettingTimeInput handleToast={handleToast} class_name="SettingInput" name1="NightvisitHoursFrom" name2='NightvisitHoursTo' />
                                </>
                            ) : null}
                        </SettingForm>
                    </>
                ) : null}
            </DynamicCard>
            <ConfirmedDialog show={isConfirm} handleClose={handleConfirm} message={message} handleOk={handle} title={title} />
        </>
    );
}
export default SettingBodyRight;
