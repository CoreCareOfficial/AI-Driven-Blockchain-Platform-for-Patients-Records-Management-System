import { Checkbox } from 'primereact/checkbox';
import React, { useState } from 'react';
import '../../css/DynamicCheckboxesStyle/DynamicCheckbobes.css';

function DynamicCheckboxes(props) {
    const { categories, title, onSelectionChange, onRemoveSelect } = props;
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [checked, setChecked] = useState(false);

    const onCategoryChange = (e) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked) {
            _selectedCategories.push(e.value);
            if (onSelectionChange) {
                onSelectionChange({ name: e.value.name, key: e.value.key, mainKey: title.key });
            }
        } else {
            _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);
            if (onRemoveSelect) {
                onRemoveSelect({ name: e.value.name, key: e.value.key, mainKey: title.key });
            }
        }
        setSelectedCategories(_selectedCategories);
        setChecked(_selectedCategories.length === categories.length);
    };

    const onMainCheckboxChange = (e) => {
        setChecked(e.checked);
        if (e.checked) {
            setSelectedCategories(categories);
            categories.forEach(element => {
                if (onSelectionChange) {
                    onSelectionChange({ name: element.name, key: element.key, mainKey: title.key });
                }
            });
        } else {
            setSelectedCategories([]);
            categories.forEach(element => {
                if (onRemoveSelect) {
                    onRemoveSelect({ name: element.name, key: element.key, mainKey: title.key });
                }
            });
        }
    };

    return (
        <div className="card flex justify-content-center" style={{ backgroundColor: 'inherit', border: 'none' }}>
            {title.name && (
                <div className="flex align-items-center ml-2 mt-2">
                    <Checkbox inputId={title.key} name={title.key} value={title.name} onChange={onMainCheckboxChange} checked={checked} />
                    <label htmlFor={title.key} className="ml-1" style={{ color: '#ffffff', marginTop: '-8px', fontSize: '16px' }}>
                        {title.name}
                    </label>
                </div>
            )}
            <div className="flex flex-column" style={{ backgroundColor: '#272C34', width: '90%', margin: 'auto', padding: '10px', marginBottom: '10px', borderRadius: '10px' }}>
                {categories.map((category) => (
                    <div key={category.key} className="flex align-items-center">
                        <Checkbox
                            inputId={category.key}
                            name={title.key}
                            value={category}
                            onChange={onCategoryChange}
                            checked={selectedCategories.some(item => item.key === category.key)}
                        />
                        <label htmlFor={category.key} className="ml-2" style={{ color: '#ffffff', marginTop: '-8px', fontSize: '14px' }}>
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DynamicCheckboxes;
