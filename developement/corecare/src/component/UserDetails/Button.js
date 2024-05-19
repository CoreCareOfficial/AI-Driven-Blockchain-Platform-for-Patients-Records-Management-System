import React from 'react';
import "../../css/UserPageStyle/button.css"

const Button = (props) => {
    return (
        <button className={props.name}>
            <span>{props.label}</span>
            {
                props.IconComponent
            }
        </button>
    );
};

export default Button;