

const TextareaField = ({ label, placeholder, rows, name, id, required, value, onChange }) => (
    <div className="flex flex-col justify-between bg-[#3F4652] rounded-md p-3 gap-2 mx-5 my-3">
        <label className="font-bold font-serif">{label}</label>
        <textarea
            className="bg-transparent border-1 border-[#272C34] outline-none rounded-md w-full p-4"
            rows={rows}
            placeholder={placeholder}
            name={name}
            id={id}
            required={required}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default TextareaField;
