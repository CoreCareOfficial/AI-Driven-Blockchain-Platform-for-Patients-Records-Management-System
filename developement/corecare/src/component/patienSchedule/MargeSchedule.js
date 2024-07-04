import React from "react";
import "../../css/UserPageStyle/content.css"
// import Flex_Container from "../bootcomponent/flex_Container";
import Calendar from "./Calendar";
import InfoPati from "./InfoPati";

import ProfileHeaderIcon from "../UserDetails/ProfileHeaderIcon";
import Osama from '../../assets/osama.jpg'

import '../../css/UserPageStyle/profile.css'
import SchCard from "./SchCard";
import "../../css/patienschedule/marge.css"
import TimeShedule from "./TimeShedule";
import DotorProvider from "./DotorProvider";
import AppointmentLocation from "./AppointmentLocation";
import AppointmentReason from "./AppointmentReason";
import { useState } from "react";

function MargeSchedule() {
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    return (
        <>
            <div className="ContiuerMargeSchedule">
                <div className="hederMargeSchedule">

                    <InfoPati />
                    <ProfileHeaderIcon image={Osama} />

                </div>
                <div><hr className /></div>
                <div className="MargeSchedule">

                    <div className="MargeScheduleBody">
                        <div className="SchCard "> <SchCard onSelectSchedule={setSelectedSchedule} /></div>
                        <div className="StyleSetion2">
                            <div className="Calendars"> <Calendar selectedSchedule={selectedSchedule} /></div>
                            <div className="TimeShedules">  < TimeShedule selectedSchedule={selectedSchedule} /></div>
                        </div>
                        <div className="StyleSetion3">
                            <div className="DotorProvider">  <DotorProvider /></div>
                            <div > <AppointmentLocation /></div>
                            <div className="AppointmentReasons"> <AppointmentReason /></div>

                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default MargeSchedule;