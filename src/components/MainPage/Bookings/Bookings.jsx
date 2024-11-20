import { useCallback, useEffect, useState } from 'react';
import './bookings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { load, unLoad } from '/src/States/loadingBookingsSlice';
import ErrorMessage from '../../ReusableComponents/ErrorMessage/ErrorMessage';
import BookingTableRows from './BookingTableRows/BookingTableRows';
const Bookings = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [errorMessageBookings, setErrorMessageBookings] = useState('');
  const isLoaded = useSelector((state) => state.loadBookings.isLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      async function fetchBookingsData() {
        try {
          const response = await fetch(
            `http://localhost:3000/bookings?userId=${sessionStorage.getItem(
              'currentUserId'
            )}`
          );
          const result = await response.json();

          if (result.length === 0) {
            setErrorMessageBookings(
              'You don’t have any bookings yet. Start planning your next stay!'
            );
            dispatch(unLoad());
            return;
          }
          setErrorMessageBookings('');
          setUserBookings(result);
          dispatch(unLoad());
        } catch (e) {
          console.error(e);
        }
      }
      fetchBookingsData();
    }
  }, [isLoaded, dispatch]);
  const handleDeleteBtn = useCallback(
    (id) => {
      async function deleteBooking() {
        try {
          await fetch(`http://localhost:3000/bookings/${id}`, {
            method: 'DELETE',
          });
          dispatch(load());
        } catch (e) {
          console.error(e);
        }
      }
      deleteBooking();
    },
    [dispatch]
  );
  return (
    <section className="bookings-container" id="bookings">
      <h3 className="bookings-container__title">Bookings</h3>
      <section className="bookings-container__table-container">
        <table className="bookings-container__table">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Apartment Name</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {errorMessageBookings ? (
              <tr>
                <td colSpan="5">
                  <ErrorMessage messageStyle="error-booking-display-message">
                    {errorMessageBookings}
                  </ErrorMessage>
                </td>
              </tr>
            ) : (
              <BookingTableRows
                handleDeleteBtn={handleDeleteBtn}
                userBookings={userBookings}
              />
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Bookings;
