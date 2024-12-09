import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useRef, useState } from 'react';
import EditInput from '../../../ReusableComponents/EditInput/EditInput';
import { useDispatch } from 'react-redux';
import { load } from '../../../../States/loadingBookingsSlice';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const BookingTable = ({ userBookings, handleDeleteBtn }) => {
  const [selectedAparmtent, setSelectedApartment] = useState('');
  const [errorCheckIn, setErrorCheckIn] = useState(false);
  const [errorCheckOut, setErrorCheckOut] = useState(false);
  const editCheckIn = useRef();
  const editCheckOut = useRef();
  const dispatch = useDispatch();

  const handleEditBtn = useCallback((id) => {
    setErrorCheckIn(false);
    setErrorCheckOut(false);
    setSelectedApartment(id);
  }, []);
  const handleCancelEditBtn = useCallback(() => {
    setErrorCheckIn(false);
    setErrorCheckOut(false);
    setSelectedApartment('');
  }, []);
  const handleSubmitBtn = useCallback(() => {
    if (!(editCheckIn.current.value || editCheckOut.current.value)) {
      setErrorCheckIn(true);
      setErrorCheckOut(true);
      return;
    }
    if (editCheckIn.current.valueAsDate >= editCheckOut.current.valueAsDate) {
      setErrorCheckIn(true);
      setErrorCheckOut(true);
      return;
    }
    async function updateBooking() {
      try {
        await fetch(`http://localhost:3000/bookings/${selectedAparmtent}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checkIn: editCheckIn.current.value,
            checkOut: editCheckOut.current.value,
          }),
        });
        dispatch(load());
        setSelectedApartment('');
      } catch (e) {
        console.error(e);
      }
    }
    setErrorCheckIn(false);
    setErrorCheckOut(false);
    updateBooking();
  }, [editCheckIn, editCheckOut, selectedAparmtent]);

  return userBookings.map((booking, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{booking.apartmentName}</td>
        <td>
          {selectedAparmtent === booking.id ? (
            <EditInput error={errorCheckIn} ref={editCheckIn} />
          ) : (
            `${booking.checkIn}`
          )}
        </td>
        <td>
          {selectedAparmtent === booking.id ? (
            <EditInput error={errorCheckOut} ref={editCheckOut} />
          ) : (
            `${booking.checkOut}`
          )}
        </td>
        <td className="bookings-container__actions">
          {!(selectedAparmtent === booking.id) ? (
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="bookings-container__edit-icon"
              onClick={() => handleEditBtn(booking.id)}
            />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleCancelEditBtn}
                className="bookings-container__cancel-icon"
              />
              <FontAwesomeIcon
                icon={faCheck}
                onClick={handleSubmitBtn}
                className="bookings-container__submit-icon"
              />
            </>
          )}
          <FontAwesomeIcon
            icon={faTrash}
            className="bookings-container__delete-icon"
            onClick={() => handleDeleteBtn(booking.id)}
          />
        </td>
      </tr>
    );
  });
};

export default BookingTable;
