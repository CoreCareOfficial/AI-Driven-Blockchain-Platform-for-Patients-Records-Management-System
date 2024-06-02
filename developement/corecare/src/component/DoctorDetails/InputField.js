

const InputField = ({ label, placeholder, type, name, id, required, autoFocus, value, onChange, cname }) => (
    <div className={`flex flex-row justify-between rounded-md p-3 gap-2 ${cname}`}>
        <label className="self-center font-bold font-serif">{label}</label>
        <input
            className="bg-transparent border-1 border-[#272C34] outline-none rounded-md w-full h-[5vh] p-4"
            placeholder={placeholder}
            autoFocus={autoFocus}
            type={type}
            name={name}
            id={id}
            required={required}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default InputField;
