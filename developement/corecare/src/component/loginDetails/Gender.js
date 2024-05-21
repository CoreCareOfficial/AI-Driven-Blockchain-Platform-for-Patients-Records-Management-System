import React, { useState } from 'react';

function Gender(props) {

    const styleDiv = {
        backgroundColor: '#ffffff',
        width: '45%',
        minWidth: '40px',
        height: '34px',
        borderRadius: '50PX',
        fontFamily: 'DM Sans',
        fontSize: '12px',
        // margin: "4px 0 0 12px",
        display: 'flex',
        margin: 'auto'
        // paddingLeft: '12px',
    };

    const styleInputRadio = {
        appearance: 'none',

        borderRadius: '25%',
        width: '16px',
        height: '16px',

        border: '1px solid #3146FF',
        // transition: '0.2s all linear'
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
        // paddingTop: '16px',
        fontFamily: 'DM Sans',
        fontSize: '14px',
        fontWeight: 700,
        display: 'block',
        margin: 'auto',
        textAlign: 'center'
    };

    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckboxChange = (event) => {
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
                    name='gender'
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
                    name='gender'
                    checked={isChecked2}
                    onChange={handleCheckboxChange}
                    style={isChecked2 ? styleInputRadio2 : styleInputRadio}
                />
            </div>
        </div>
    );
};

export default Gender;