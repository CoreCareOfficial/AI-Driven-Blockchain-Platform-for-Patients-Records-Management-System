import '../../css/DoctorPageStyle/diagonsis.css';

const NextVisit = ({ date, onDateChange, reason, onReasonChange }) => (
    <div className="next-visit bg-[#3F4652] gap-3 rounded-md p-6 mx-5 my-3 flex flex-col justify-between">
        <label className="self-center font-bold font-serif">Next visit</label>
        <div className="bg-[#3F4652] gap-3 rounded-md mx-5 my-3 flex flex-row justify-between ">
            <textarea
                className="bg-transparent border-1 border-[#272C34] outline-none rounded-md w-full p-4" placeholder='Reason for next visit' rows={1}
                value={reason}
                onChange={onReasonChange}
            />
            <input
                type="datetime-local"
                className=" bg-transparent border-1 border-[#272C34] outline-none p-1 w-2/3"
                value={date}
                onChange={onDateChange}
            />
        </div>
    </div>
);

export default NextVisit;
