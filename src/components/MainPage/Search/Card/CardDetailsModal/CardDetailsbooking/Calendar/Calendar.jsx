import { useCallback } from 'react';
import './calendar.scss';

const Calendar = ({
  calendar,
  calendarDayList,
  calendarType,
  name,
  setCalendarDay,
  onChange,
  value,
}) => {
  const handleInputMonth = useCallback(
    (e, text) => {
      setCalendarDay(calendar.month[e.target.value]);
      onChange(text, e);
    },
    [onChange, setCalendarDay, calendar]
  );
  return (
    <section className="calendar-container">
      <label htmlFor={calendarType} className="calendar-container__label">
        {name}
      </label>
      <article className="calendar-container__select-container">
        <select
          name={calendarType}
          id={calendarType}
          className="calendar-container__select"
          onChange={(e) => onChange('day', e)}
          value={value.day}
        >
          <option disabled value="">
            Day
          </option>
          {calendarDayList.map((day, index) => {
            return (
              <option value={day} key={index}>
                {day}
              </option>
            );
          })}
        </select>
        <select
          name={calendarType}
          id={calendarType}
          className="calendar-container__select"
          onChange={(e) => handleInputMonth(e, 'month')}
          value={value.month}
        >
          <option disabled value="">
            Month
          </option>
          {Object.entries(calendar.month).map(([key]) => {
            return (
              <option value={key} key={key}>
                {key}
              </option>
            );
          })}
        </select>
        <select
          name={calendarType}
          id={calendarType}
          className="calendar-container__select"
          onChange={(e) => onChange('year', e)}
          value={value.year}
        >
          <option disabled value="">
            Year
          </option>
          {calendar.year.map((year, index) => {
            return (
              <option value={year} key={index}>
                {year}
              </option>
            );
          })}
        </select>
      </article>
    </section>
  );
};

export default Calendar;
