import { useCallback } from 'react';
import './formOverlay.scss';
import useWindowSize from '../../customHooks/useWindowSize';
import Buttons from '../../ReusableComponents/Buttons/Buttons';
const FormOverlay = ({ overlay, setOverlay }) => {
  const handleClickOverlay = useCallback(() => {
    setOverlay((prevValue) => !prevValue);
  }, [setOverlay]);

  const { width } = useWindowSize();

  return (
    <section
      className={`loginRegister-section__form-overlay ${
        overlay
          ? `${width > 600 ? 'move-right' : 'move-down'} formRegistrationColor`
          : `${width > 600 ? 'move-left' : 'move-up'}  formLoginColor`
      }`}
    >
      <div className={`loginRegister-section__overlay-container`}>
        <h3 className="loginRegister-section__overlay-title">
          {overlay ? 'Hello, Friend!' : 'Welcome Back!'}
        </h3>
        <p className="loginRegister-section__overlay-text">
          {overlay
            ? 'Enter your personal details and start journey with us'
            : 'To keep connected with us please login with your personal info'}
        </p>
        <Buttons
          onClick={handleClickOverlay}
          btnColor={overlay ? 'overlay-btn-sign-up' : 'overlay-btn-sign-in'}
        >
          {overlay ? 'Sign Up' : 'Sign In'}
        </Buttons>
      </div>
    </section>
  );
};

export default FormOverlay;
