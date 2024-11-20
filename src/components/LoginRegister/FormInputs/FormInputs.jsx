import './formInputs.scss';

const FormInputs = ({ inputImage, ...props }) => {
  return (
    <>
      <input {...props} className={`login-register-inputs ${inputImage}`} />
    </>
  );
};

export default FormInputs;
