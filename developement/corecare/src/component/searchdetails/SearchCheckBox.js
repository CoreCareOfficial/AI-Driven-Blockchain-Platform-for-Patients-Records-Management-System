import { Checkbox } from "primereact/checkbox";
import React,{useState} from "react";

function SearchCheckBox(props) {
    const [checked, setChecked] = useState(false);
    return (
        <>
            <div className="flex align-items-center ml-2 mt-2">
                <Checkbox inputId={props.id} name={props.name} value={props.value} onChange={() => setChecked(!checked)} checked={checked} />
                <label htmlFor={props.id} className="ml-1" style={{ color: '#ffffff', marginTop: '-8px', fontSize: '16px' }}>
                    {props.value}
                </label>
            </div>
        </>
    );
}
export default SearchCheckBox;