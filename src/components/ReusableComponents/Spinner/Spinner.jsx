import './spinner.scss';

const Spinner = ({ spinnerImage, searchClass }) => {
  return (
    <img
      src={spinnerImage}
      alt="loader image"
      className={searchClass ? searchClass : ''}
    />
  );
};

export default Spinner;
