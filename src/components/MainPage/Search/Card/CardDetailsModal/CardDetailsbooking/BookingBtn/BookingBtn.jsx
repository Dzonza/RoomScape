import { useCallback, useState } from 'react';
import Buttons from '../../../../../../ReusableComponents/Buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '/src/States/bookingModalSlice';
import { load } from '/src/States/loadingBookingsSlice';
import ErrorMessage from '../../../../../../ReusableComponents/ErrorMessage/ErrorMessage';

const BookingBtn = ({ checkIn, checkOut, apartmentInfo }) => {
  const [errorBooking, setErrorBooking] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const checkInputsForBooking = useCallback(() => {
    const inDay = parseInt(checkIn.day);
    const inMonth = parseInt(checkIn.month);
    const inYear = parseInt(checkIn.year);
    const outDay = parseInt(checkOut.day);
    const outMonth = parseInt(checkOut.month);
    const outYear = parseInt(checkOut.year);
    if (!isLoggedIn) {
      setErrorBooking('Please Login First');
      return false;
    }
    if (
      !(
        checkIn.year &&
        checkIn.month &&
        checkIn.day &&
        checkOut.year &&
        checkOut.month &&
        checkOut.day
      )
    ) {
      setErrorBooking('Please fill all the booking fields.');
      return false;
    }
    if (inYear > outYear) {
      setErrorBooking('Please change the year input fields.');
      return false;
    }
    if (inYear === outYear) {
      if (inMonth > outMonth) {
        setErrorBooking('Please change the month input fields.');
        return false;
      }
    }
    if (inYear === outYear) {
      if (inMonth === outMonth) {
        if (inDay >= outDay) {
          setErrorBooking('Please change the day input fields.');
          return false;
        }
      }
    }
    setErrorBooking('');
    return true;
  }, [isLoggedIn, checkIn, checkOut]);

  const handleBookingBtn = useCallback(() => {
    if (!checkInputsForBooking()) {
      return;
    }

    async function bookingApartment() {
      try {
        await fetch('http://localhost:3000/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: sessionStorage.getItem('currentUserId'),
            apartmentName: apartmentInfo.title,
            apartmentId: apartmentInfo.clientLoggingData.productId,
            checkIn: `${checkIn.year}-${checkIn.month.padStart(
              2,
              '0'
            )}-${checkIn.day.padStart(2, '0')}`,
            checkOut: `${checkOut.year}-${checkOut.month.padStart(
              2,
              '0'
            )}-${checkOut.day.padStart(2, '0')}`,
          }),
        });
        dispatch(load());
        dispatch(close());
      } catch (e) {
        console.error(e);
      }
    }
    bookingApartment();
  }, [checkInputsForBooking, apartmentInfo, checkIn, checkOut, dispatch]);

  return (
    <section className="booking-btn-container">
      {errorBooking ? (
        <ErrorMessage messageStyle="error-booking">{errorBooking}</ErrorMessage>
      ) : (
        ''
      )}
      <Buttons btnColor="booking-btn-container__btn" onClick={handleBookingBtn}>
        Book Now
      </Buttons>
    </section>
  );
};

export default BookingBtn;
