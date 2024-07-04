
import { useState, useEffect } from "react";
import "../../css/patienschedule/timeShedule.css"
import { BiCheck } from "react-icons/bi";
const TimeShedule = ({ selectedSchedule }) => {
    const [selecttime, setselecttime] = useState("0");
    useEffect(() => {
        if (selectedSchedule) {
            const timey = selectedSchedule.time;

            setselecttime(timey);
        }
    }, [selectedSchedule]);
    const times = [{ time: '8:30 AM' },
    { time: '8:45 AM' },
    { time: '9:00 AM' },
    { time: '9:15 AM' },
    { time: '9:30 AM' },
    { time: '9:45 AM' },
    { time: '10:00 AM' },
    { time: '10:15 AM' },
    { time: '10:30 AM' },
    { time: '10:45 AM' },
    { time: '11:00 AM' },
    { time: '11:15 AM' },
    { time: '11:30 AM' },
    { time: '11:45 AM' },
    { time: '1:00 PM' }];
    console.log(selecttime);




    return (

        <>
            <div className="coutinerTimeSheduleMain">
                <div className="coutinerTimeSheduleheder">
                    Avaibable time for appointment
                </div>
                <div className="coutinerTimeShedule">
                    {times.map(slot => {
                        return (
                            <div className="appSelectTime">
                                {
                                    slot.time === selecttime ? (
                                        <div className="selectTime">
                                            <div className="selectTimein">{slot.time}</div>
                                            <div className="IconChick"><BiCheck /></div>
                                        </div>
                                    ) : (
                                        <div className="noselectTime" >{slot.time}</div>
                                    )
                                }
                            </div>
                        )
                    })}


                </div>
            </div>
        </>

    );
}

export default TimeShedule;