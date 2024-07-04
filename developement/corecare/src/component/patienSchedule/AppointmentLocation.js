import React from "react";
import "../../css/patienschedule/Appointmentlocation.css"
import { MdPlace, MdPinDrop } from "react-icons/md";
import { FaHospital } from 'react-icons/fa6';



function AppointmentLocation() {
    return (
        <>
            <div className="containerAppointmen">

                <div className="hedarAppointmen">
                    <div className="hedarAppointmenicon"><MdPlace /></div>
                    <div className="hedarAppointmenText"><h6>Appointment Location</h6></div>
                </div>
                <div className="HospitalName">
                    <div className="HospitalLocationicon"><FaHospital /></div>
                    <div><h6>Taiz Hospital</h6></div>
                </div>
                <div className="HospitalLocation">
                    <div className="HospitalLocationicon"><MdPinDrop /></div>
                    <div><h6>Gmal Street</h6></div>
                </div>



            </div>
        </>

    );
}

export default AppointmentLocation;