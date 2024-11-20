import { useCallback, useEffect, useState } from 'react';
import './cardDetailsBooking.scss';
import Calendar from './Calendar/Calendar';
import BookingBtn from './BookingBtn/BookingBtn';
const calendar = {
  year: [2024, 2025, 2026],
  month: {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  },
  day: 31,
};
const CardDetailsBooking = ({ apartmentInfo }) => {
  const [calendarDayCheckIn, setCalendarDayCheckIn] = useState(0);
  const [calendarDayCheckOut, setCalendarDayCheckOut] = useState(0);
  const [daysPerMonthCheckIn, setDaysPerMonthCheckIn] = useState([]);
  const [daysPerMonthCheckOut, setDaysPerMonthCheckOut] = useState([]);
  const [checkIn, setCheckIn] = useState({
    day: '',
    month: '',
    year: '',
  });
  const [checkOut, setCheckOut] = useState({
    day: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    setCalendarDayCheckIn(calendar.day);
    setCalendarDayCheckOut(calendar.day);
  }, []);

  useEffect(() => {
    let listOfDaysCheckIn = [];
    let listOfDaysCheckOut = [];
    for (let i = 1; i <= calendarDayCheckIn; i++) {
      listOfDaysCheckIn.push(i);
    }
    for (let i = 1; i <= calendarDayCheckOut; i++) {
      listOfDaysCheckOut.push(i);
    }
    setDaysPerMonthCheckOut(listOfDaysCheckOut);
    setDaysPerMonthCheckIn(listOfDaysCheckIn);
  }, [calendarDayCheckIn, calendarDayCheckOut]);

  const handlingInput = useCallback((func, calendarValue, e) => {
    if (calendarValue === 'day') {
      func((prevValue) => ({
        ...prevValue,
        day: e.target.value,
      }));
    }
    if (calendarValue === 'month') {
      func((prevValue) => ({
        ...prevValue,
        month: e.target.value,
      }));
    }
    if (calendarValue === 'year') {
      func((prevValue) => ({
        ...prevValue,
        year: e.target.value,
      }));
    }
  }, []);
  const handleCheckIn = useCallback(
    (calendarValue, e) => {
      handlingInput(setCheckIn, calendarValue, e);
    },
    [handlingInput]
  );

  const handleCheckOut = useCallback(
    (calendarValue, e) => {
      handlingInput(setCheckOut, calendarValue, e);
    },
    [handlingInput]
  );

  return (
    <>
      <section className="booking-section-calendar">
        <Calendar
          calendar={calendar}
          calendarDay={calendarDayCheckIn}
          setCalendarDay={setCalendarDayCheckIn}
          calendarDayList={daysPerMonthCheckIn}
          calendarType="checkIn"
          name="Check In"
          onChange={handleCheckIn}
          value={checkIn}
        />
        <Calendar
          calendar={calendar}
          calendarDay={calendarDayCheckOut}
          setCalendarDay={setCalendarDayCheckOut}
          calendarType="checkOut"
          name="Check Out"
          onChange={handleCheckOut}
          calendarDayList={daysPerMonthCheckOut}
          value={checkOut}
        />
      </section>
      <BookingBtn
        checkIn={checkIn}
        checkOut={checkOut}
        apartmentInfo={apartmentInfo}
      />
    </>
  );
};

export default CardDetailsBooking;
