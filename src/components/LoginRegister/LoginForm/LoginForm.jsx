import { useCallback, useState } from 'react';
import FormInputs from '../FormInputs/FormInputs';
import './loginForm.scss';
import ErrorMessage from '../../ReusableComponents/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { login } from '/src/States/authSlice';
import { useDispatch } from 'react-redux';
import Buttons from '../../ReusableComponents/Buttons/Buttons';
const LoginForm = ({ setNotificationMessage }) => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginForm = useCallback((e, inputName) => {
    const value = e.target.value.trim();
    if (!value) {
      inputName === 'username'
        ? setErrorUsername('Please fill the username field.')
        : setErrorPassword('Please fill the password field.');
      return;
    }
    inputName === 'username' ? setErrorUsername('') : setErrorPassword('');
    setLoginForm((prevValue) => ({
      ...prevValue,
      [inputName]: value,
    }));
  }, []);

  const handleClick = useCallback(() => {
    if (!loginForm.username && !loginForm.password) return;
    async function getUserDetails() {
      try {
        const result = await fetch(
          `http://localhost:3000/accounts?username=${loginForm.username}&password=${loginForm.password}`
        );
        const data = await result.json();
        if (data.length === 0) {
          setNotificationMessage(
            '❌ Invalid username or password, please try again.'
          );
          return;
        }
        setNotificationMessage('');
        sessionStorage.setItem('currentUserId', data[0].id);
        dispatch(login());
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    }
    getUserDetails();
  }, [
    loginForm.username,
    loginForm.password,
    setNotificationMessage,
    navigate,
    dispatch,
  ]);

  return (
    <div className="loginRegister-section__login">
      <h2 className="loginRegister-section__title">Sign In</h2>
      <div className="loginRegister-section__login-container">
        <FormInputs
          onBlur={(e) => handleLoginForm(e, 'username')}
          type="text"
          placeholder="Username"
          inputImage="UserNameImage"
          name="username"
        />
        {errorUsername ? (
          <ErrorMessage messageStyle="loginRegister-error-message">
            {errorUsername}
          </ErrorMessage>
        ) : (
          ''
        )}
        <FormInputs
          onBlur={(e) => handleLoginForm(e, 'password')}
          type="password"
          placeholder="Password"
          inputImage="PasswordImage"
          name="password"
        />
        {errorPassword ? (
          <ErrorMessage messageStyle="loginRegister-error-message">
            {errorPassword}
          </ErrorMessage>
        ) : (
          ''
        )}
      </div>
      <Buttons onClick={handleClick} btnColor="loginBtn">
        Sign In
      </Buttons>
    </div>
  );
};

export default LoginForm;
