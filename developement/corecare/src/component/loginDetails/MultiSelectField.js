import { useState } from "react";
import { userInfo } from "../../Recoil/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";


function MultiSelectField(props) {
    const items = {
        "General Medical Practice Degrees":
            [
                "Doctor of Medicine(MD)",
                "Doctor of Osteopathic Medicine(DO)",
                "Bachelor of Medicine, Bachelor of Surgery(MBBS or MBChB)"
            ],
        "Specialized Medical Practice Degrees":
            [
                "Doctor of Dental Surgery (DDS)",
                "Doctor of Dental Medicine (DMD)",
                "Doctor of Podiatric Medicine (DPM)",
                "Doctor of Optometry (OD)",
                "Doctor of Pharmacy (PharmD)",
                "Doctor of Chiropractic (DC)",
                "Doctor of Veterinary Medicine (DVM)"
            ]
    };

    const selectItems = Object.keys(items).map((optgroup) => {
        return (
            <optgroup key={optgroup} label={optgroup}>
                {items[optgroup].map((item) => {
                    return (
                        <option key={item} value={item}>{item}</option>
                    );
                }
                )
                }
            </optgroup>
        );
    }
    );

    const setUserInfo = useSetRecoilState(userInfo);
    const userInfoValue = useRecoilValue(userInfo);
    const [selectedValue, setSelectedValue] = useState(userInfoValue.medicalSpecialization);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            academicDegree: event.target.value
        }));

    };

    return (
        <select id="dino-select" style={props.style} value={selectedValue} onChange={handleChange}>
            <option disabled selected hidden>{props.placeholder}</option>
            {selectItems}
        </select>
    );
};

export default MultiSelectField;