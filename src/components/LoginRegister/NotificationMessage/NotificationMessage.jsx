import './notificationMessage.scss';

const NotificationMessage = ({ message }) => {
  return (
    <div
      className={`message-container ${
        message.includes('✅') ? 'success' : ''
      } ${message.includes('❌') ? 'error' : ''}`}
    >
      <p>{message}</p>
    </div>
  );
};

export default NotificationMessage;
