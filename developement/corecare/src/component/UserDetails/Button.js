import React from 'react';
import "../../css/UserPageStyle/button.css"

const Button = (props) => {
    const handleClick = () => {
        if (props.onClick)
            props.onClick()
    };
    return (
        <button className={props.name} onClick={handleClick}>
            <span>{props.label}</span>
            {
                props.IconComponent
            }
        </button>
    );
};

export default Button;