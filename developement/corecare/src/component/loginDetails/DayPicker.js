import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const styleInput = {
    backgroundColor: '#ffffff',
    color: '#272c34',
    width: '100%',
    minWidth: '40px',
    height: '34px',
    borderRadius: '50PX',
    fontFamily: 'DM Sans',
    fontSize: '12px',
    margin: "4px 0",
    paddingLeft: '12px',
};


function DayPicker() {
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div style={styleInput}>
            <DatePicker
                selected={selectedDate}
                dateFormat="dd" // Set date format to show only day
                showMonthDropdown={false} // Hide month dropdown
                showYearDropdown={false} // Hide year dropdown
                showTimeSelect={false} // Hide time selection
                onSelect={handleDateChange}
                customInput={<input type="text" placeholder="Select your birth day" />} // Custom input for better display
            />
        </div>
    );
}

export default DayPicker;
