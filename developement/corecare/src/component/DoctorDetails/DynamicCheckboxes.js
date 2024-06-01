import { Checkbox } from 'primereact/checkbox';
import React, { useState } from "react";
import '../../css/DynamicCheckboxesStyle/DynamicCheckbobes.css'

function DynamicCheckboxes(props) {

    const categories = props.categories;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked)
            _selectedCategories.push(e.value);
        else
            _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

        setSelectedCategories(_selectedCategories);
    };

    return (
        <div className="card flex justify-content-center" style={{ backgroundColor: 'inherit', border: 'none' }}>
            {props.title && <div className="flex align-items-center ml-2 mt-2">
                <Checkbox inputId={props.key} name={props.key} value={props.title} />
                <label htmlFor={props.key} className="ml-1"
                    style={{ color: '#ffffff', marginTop: '-8px', fontSize: '16px' }}>{props.title}</label>
            </div>}
            <div className="flex flex-column" style={{
                backgroundColor: '#272C34',
                width: '90%',
                margin: 'auto',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '10px'
            }}>
                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center">
                            <Checkbox
                                inputId={category.key}
                                name={props.key}
                                value={category}
                                onChange={onCategoryChange}
                                checked={selectedCategories.some((item) => item.key === category.key)}
                            />
                            <label htmlFor={category.key} className="ml-2" style={{ color: '#ffffff', marginTop: '-8px', fontSize: '14px' }}>
                                {category.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default DynamicCheckboxes;