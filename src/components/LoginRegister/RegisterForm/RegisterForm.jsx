import { useState, useCallback } from 'react';
import FormInputs from '../FormInputs/FormInputs';
import './registerForm.scss';
import ErrorMessage from '../../ReusableComponents/ErrorMessage/ErrorMessage';
import Buttons from '../../ReusableComponents/Buttons/Buttons';

const RegisterForm = ({ setOverlay, setNotificationMessage }) => {
  const [registerInputs, setRegisterInputs] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [errorName, setErrorName] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const clearAllInputs = useCallback(() => {
    setRegisterInputs({
      name: '',
      username: '',
      password: '',
    });
  }, []);

  const handleErrorName = useCallback(
    (e) => {
      const inputName = e.target.name;
      if (inputName === 'name' && !registerInputs.name) {
        setErrorName('Please fill the name field.');
        return;
      } else {
        setErrorName('');
      }
    },
    [registerInputs.name]
  );

  const handleErrorUsername = useCallback(
    (e) => {
      const inputName = e.target.name;
      if (inputName === 'username' && !registerInputs.username) {
        setErrorUsername('Please fill the username field.');
        return;
      } else {
        setErrorUsername('');
      }
    },
    [registerInputs.username]
  );

  const handleErrorPassword = useCallback(
    (e) => {
      const inputName = e.target.name;
      if (
        (inputName === 'password' && !registerInputs.password) ||
        registerInputs.password.length < 8 ||
        registerInputs.password.length > 15
      ) {
        setErrorPassword('Password must be betweem 8 and 15 charachters.');
        return;
      } else {
        setErrorPassword('');
      }
    },
    [registerInputs.password]
  );

  const handleRegisterInputs = useCallback((e) => {
    let value = e.target.value.trim();
    const inputName = e.target.name;
    if (inputName === 'name')
      value = value.charAt(0).toUpperCase() + value.slice(1);
    setRegisterInputs((prevValue) => ({
      ...prevValue,
      [inputName]: value,
    }));
  }, []);

  const handleRegisterBtn = useCallback(() => {
    async function createAccount() {
      try {
        await fetch('http://localhost:3000/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: registerInputs.name,
            username: registerInputs.username,
            password: registerInputs.password,
          }),
        });

        clearAllInputs();
        setOverlay((prevValue) => !prevValue);
        setNotificationMessage('✅ Account has been created successfully.');
      } catch (e) {
        console.error(e);
      }
    }
    if (
      registerInputs.name &&
      registerInputs.username &&
      registerInputs.password &&
      registerInputs.password.length >= 8 &&
      registerInputs.password.length <= 15
    ) {
      createAccount();
    } else {
      setNotificationMessage('');
    }
  }, [registerInputs, clearAllInputs, setOverlay, setNotificationMessage]);

  return (
    <div className="loginRegister-section__register">
      <h2 className="loginRegister-section__title">Create Account</h2>
      <div className="loginRegister-section__register-inputs">
        <FormInputs
          onChange={handleRegisterInputs}
          onBlur={handleErrorName}
          placeholder="Name"
          type="text"
          inputImage="nameImage"
          name="name"
          value={registerInputs.name}
        />
        {errorName ? (
          <ErrorMessage messageStyle="loginRegister-error-message">
            {errorName}
          </ErrorMessage>
        ) : (
          ''
        )}
        <FormInputs
          onChange={handleRegisterInputs}
          onBlur={handleErrorUsername}
          placeholder="Username"
          type="text"
          inputImage="UserNameImage"
          name="username"
          value={registerInputs.username}
        />
        {errorUsername ? (
          <ErrorMessage messageStyle="loginRegister-error-message">
            {errorUsername}
          </ErrorMessage>
        ) : (
          ''
        )}

        <FormInputs
          onChange={handleRegisterInputs}
          onBlur={handleErrorPassword}
          placeholder="Password"
          type="password"
          inputImage="PasswordImage"
          minLength={8}
          maxLength={15}
          name="password"
          value={registerInputs.password}
        />
        {errorPassword ? (
          <ErrorMessage messageStyle="loginRegister-error-message">
            {errorPassword}
          </ErrorMessage>
        ) : (
          ''
        )}
      </div>
      <Buttons onClick={handleRegisterBtn} btnColor="registerBtn">
        Sign Up
      </Buttons>
    </div>
  );
};

export default RegisterForm;
