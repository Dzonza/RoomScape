import { forwardRef } from 'react';
import './editInput.scss';

const EditInput = forwardRef(({ error }, ref) => {
  return (
    <input
      ref={ref}
      type="date"
      required
      className={`booking-edit-inputs ${error && 'error-edit-input'}`}
    />
  );
});

export default EditInput;
