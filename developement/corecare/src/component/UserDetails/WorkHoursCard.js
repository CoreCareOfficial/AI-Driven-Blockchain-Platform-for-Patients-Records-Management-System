import { FaHospital } from "react-icons/fa6";
import { MdCalendarToday } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaCloudMoon } from "react-icons/fa";





function WorkHoursCard(props) {
    const items = Array.isArray(props.WorkHours) ? props.WorkHours : [];
    return (
        <>

            {items.length > 0 ? (
                items.map((workHour, index) => (
                    <div key={index} className="flex flex-col bg-gray-600 p-2 rounded-xl my-2">
                        <div className="flex flex-row items-center gap-2 text-white p-2">
                            <FaHospital />
                            <h6>{workHour.hospitalName}</h6>
                        </div>
                        <div className="flex flex-row items-center gap-2 text-white mx-5">
                            <MdCalendarToday />
                            <p>{workHour.workDays}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-white">
                            <div className="flex flex-row items-center gap-2 my-2">
                                <MdLightMode />
                                <p>{workHour.DayworkHours}</p>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <FaCloudMoon />
                                <p>{workHour.NightworkHours}</p>
                            </div>
                        </div>
                    </div >
                ))
            ) : (
                <div>No items to display</div>
            )}
        </>
    );
}

export default WorkHoursCard;

