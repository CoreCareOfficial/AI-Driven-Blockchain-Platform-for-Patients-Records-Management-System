import React, { useState } from 'react';
import { HealthcareFacilityInfo, userInfo } from '../../Recoil/Atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function Gender(props) {

    const styleDiv = {
        backgroundColor: '#ffffff',
        width: '45%',
        minWidth: '40px',
        height: '34px',
        borderRadius: '50PX',
        fontFamily: 'DM Sans',
        fontSize: '12px',
        display: 'flex',
        margin: 'auto'
    };

    const styleInputRadio = {
        appearance: 'none',
        borderRadius: '25%',
        width: '16px',
        height: '16px',
        border: '1px solid #3146FF',
        margin: 'auto'
    };

    const styleInputRadio2 = {
        appearance: 'none',
        borderRadius: '25%',
        width: '16px',
        height: '16px',
        backgroundColor: '#3146FF',
        border: '1px solid #ffffff',
        outline: '2px solid #3146FF',
        margin: 'auto'
    };

    const styleSpan = {
        marginRight: '15px',
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: 700,
        display: 'block',
        margin: 'auto',
        textAlign: 'center'
    };

    const setUserInfo = useSetRecoilState(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const userInfoValue = useRecoilValue(props.isFacility ? HealthcareFacilityInfo : userInfo);
    const [isChecked, setIsChecked] = useState(userInfoValue[props.name] === props.option1);
    const [isChecked2, setIsChecked2] = useState(userInfoValue[props.name] === props.option2);


    const handleCheckboxChange = (event) => {
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [props.name]: event.target.value
        }));
        console.log(props.name);
        console.log(event.target.value);
        if (event.target.id === '1') {
            setIsChecked2(false); // Toggle checked state
            setIsChecked(true); // Toggle checked state
        }
        else if (event.target.id === '2') {
            setIsChecked(false); // Toggle checked state
            setIsChecked2(true); // Toggle checked state
        }
    };

    return (

        <div className="row">
            <div className="col col-lg-6" style={styleDiv}>
                <span style={styleSpan}>
                    {props.option1}
                </span>
                <input
                    type="radio"
                    id='1'
                    name={props.sex}
                    value={props.option1}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    style={isChecked ? styleInputRadio2 : styleInputRadio}
                />
            </div>
            <div className="col col-lg-6" style={styleDiv}>
                <span style={styleSpan}>
                    {props.option2}
                </span>
                <input
                    type="radio"
                    id='2'
                    name={props.sex}
                    value={props.option2}
                    checked={isChecked2}
                    onChange={handleCheckboxChange}
                    style={isChecked2 ? styleInputRadio2 : styleInputRadio}
                />
            </div>
        </div>
    );
};

export default Gender;