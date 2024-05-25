import { FaHospital } from "react-icons/fa6";
import { MdCalendarToday } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaCloudMoon } from "react-icons/fa";





function WorkHoursCard(props) {
    return (
        <>

            {Object.keys(props.WorkHours).map((workHour, index) => (
                    <div key={index} className="flex flex-col bg-gray-600 p-2 rounded-xl my-2">
                        <div className="flex flex-row items-center gap-2 text-white p-2">
                            <FaHospital />
                            <h6>{props.WorkHours[workHour].hospitalName}</h6>
                        </div>
                        <div className="flex flex-row items-center gap-2 text-white mx-5">
                            <MdCalendarToday />
                            <p>{props.WorkHours[workHour].workDays}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-white">
                            <div className="flex flex-row items-center gap-2 my-2">
                                <MdLightMode />
                                <p>{props.WorkHours[workHour].DayworkHours}</p>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <FaCloudMoon />
                                <p>{props.WorkHours[workHour].NightworkHours}</p>
                            </div>
                        </div>
                    </div >
            ))}
        </>
    );
}

export default WorkHoursCard;

