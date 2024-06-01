import '../../css/DoctorPageStyle/diagonsis.css';

const NextVisit = ({ value, onChange }) => (
    <div className="next-visit bg-[#3F4652] gap-3 rounded-md p-6 mx-5 my-3 flex flex-row justify-between">
        <label className="self-center font-bold font-serif">Date of next visit</label>
        <input
            type="date"
            className="flex-grow bg-transparent border-1 border-[#272C34] outline-none p-2"
            value={value}
            onChange={onChange}
        />
    </div>
);

export default NextVisit;
