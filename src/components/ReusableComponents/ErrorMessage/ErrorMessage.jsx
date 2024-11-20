import './errorMessage.scss';

const ErrorMessage = ({ children, messageStyle }) => {
  return <p className={`${messageStyle ? messageStyle : ''}`}>{children}</p>;
};

export default ErrorMessage;
