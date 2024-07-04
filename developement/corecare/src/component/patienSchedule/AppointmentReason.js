import React from "react";
import "../../css/patienschedule/Appointmentreason.css"
import { MdNoteAlt } from "react-icons/md";




function AppointmentReason() {
    const hintTextarea = `Provide any additional details 
    about the purpose of the appointment
    or specific instructions for the patient.`;
    return (
        <>
            <div className="containerAppointmentReason">
                <div className="hedarAppointmentR">
                    <div className="hedarAppointmenReicon"><  MdNoteAlt /></div>
                    <div className="hedarAppointmenReText" >Appointment Reason or Notes</div>
                </div>

                <div className="Textarea">
                    <textarea placeholder={hintTextarea}></textarea>
                </div>






            </div>
        </>

    );
}

export default AppointmentReason;