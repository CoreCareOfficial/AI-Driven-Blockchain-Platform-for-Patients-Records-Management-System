


import React, { useState, useEffect } from 'react';
import '../../css/patienschedule/calendar.css';

const Calendar = ({ selectedSchedule }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (selectedSchedule) {
            const { Year, Manth } = selectedSchedule.date;

            setCurrentDate(new Date(Year, Manth - 1));
        }
    }, [selectedSchedule]);

    const daysOfWeek = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const startDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const renderCalendar = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const daysInMonth = getDaysInMonth(month, year);
        const startDay = startDayOfMonth(month, year);
        const weeks = [];
        let days = [];

        const lastMonth = month === 0 ? 11 : month - 1;
        const lastMonthYear = month === 0 ? year - 1 : year;
        const daysInLastMonth = getDaysInMonth(lastMonth, lastMonthYear);

        for (let i = 0; i < startDay; i++) {
            const dateToShow = daysInLastMonth - (startDay - i - 1);
            days.push(<td key={`empty-${i}`} className="dark-cell">{dateToShow}</td>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (days.length === 7) {
                weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
                days = [];
            }
            const isSelectedDay = selectedSchedule && day === selectedSchedule.date.Day && month === (selectedSchedule.date.Manth - 1) && year === selectedSchedule.date.Year;
            days.push(<td key={`day-${day}`} className={isSelectedDay ? 'Selectday' : ''}>{day}</td>);
        }

        if (days.length > 0) {
            let nextMonthDay = 1;
            for (let i = days.length; i < 7; i++) {
                days.push(<td key={`empty-next-${nextMonthDay}`} className="dark-cell">{nextMonthDay}</td>);
                nextMonthDay++;
            }
            weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
        }

        return weeks;
    };

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

    const handleNextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

    return (
        <div className='divTable'>
            <div className="calendar-header">
                <button className='btnt' onClick={handlePrevMonth}>{"<"}</button>
                <div className='calenderMonth'>
                    <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
                </div>
                <button className='btntr' onClick={handleNextMonth}>{">"}</button>
            </div>
            <table className='tabledate'>
                <thead>
                    <tr>
                        {daysOfWeek.map(day => (
                            <th className='theatTh' key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar()}
                </tbody>
            </table>
            <div className="calendar-footer">
                <button className='btnt' onClick={handlePrevMonth}>{"<"}</button>
                <button className='btntr' onClick={handleNextMonth}>{">"}</button>
            </div>
        </div>
    );
};

export default Calendar;
