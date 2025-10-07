import React from 'react';
import '../assets/styles/WeeklyCalendar.css';

const WeeklyCalendar = ({ todayDate }) => {
    console.log(`todayDate: ${todayDate}`);
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysAgo = (24 * 60 * 60 * 1000);

    const getWeekDates = (start) => {
        const dates = [];
        const baseDate = new Date(start);
        for (let i = 0; i < 7; i++) {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    

    const dayOfTheWeek = new Date(todayDate).getDay();
    console.log(`DayOfTheWeek: ${dayOfTheWeek}`)

    const startDate = (new Date(todayDate - dayOfTheWeek * daysAgo)).toDateString();
    console.log(`startDate: ${startDate}`)

    const weekDates = getWeekDates(startDate);
    console.log(`weekDates: ${weekDates}`)

    return (
        <div className='week-viewer'>
            <div className='week-labels'>
                {dayLabels.map((day, i) => (
                    <div key={i} className='day-label'>{day}</div>
                ))}
            </div>
            <div className='week-dates'>
                {weekDates.map((date, i) => (
                    <div 
                        key={i}
                        className={
                            date.getMonth() === weekDates[0].getMonth()
                            ? 'day-date'
                            : 'day-date-2'
                        }
                    >
                        {`${date.getMonth() + 1}/${date.getDate()}`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyCalendar;