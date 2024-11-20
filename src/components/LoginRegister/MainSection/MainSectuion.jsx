import './mainSection.scss';
import FormOverlay from '../FormOverlay/FormOverlay';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useCallback, useState } from 'react';
import NotificationMessage from '../NotificationMessage/NotificationMessage';
import ExitBtn from '../../ReusableComponents/ExitBtn/ExitBtn';
import Logo from '/src/components/ReusableComponents/Logo/Logo';
import useWindowSize from '../../customHooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
const MainSectuion = ({ overlay, setOverlay }) => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const { height, width } = useWindowSize();
  const navigation = useNavigate();
  const handleExitBtn = useCallback(() => {
    navigation('/');
  }, [navigation]);

  return (
    <section
      className={`loginRegister-section ${
        width <= 600 && height < 800 ? 'add-overflow' : ''
      }`}
    >
      <Logo logoStyle="loginRegister-logo" />
      <div className="loginRegister-section__loginRegister-form">
        <ExitBtn
          onClick={handleExitBtn}
          exitBtnStyle="loginRegister-exit-btn"
        />
        <NotificationMessage message={notificationMessage} />
        <FormOverlay overlay={overlay} setOverlay={setOverlay} />
        <LoginForm setNotificationMessage={setNotificationMessage} />
        <RegisterForm
          setOverlay={setOverlay}
          setNotificationMessage={setNotificationMessage}
        />
      </div>
    </section>
  );
};

export default MainSectuion;
