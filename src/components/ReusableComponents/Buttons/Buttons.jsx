import './buttons.scss';

const Buttons = ({ children, btnColor, onClick }) => {
  return (
    <button onClick={onClick} className={btnColor}>
      {children}
    </button>
  );
};

export default Buttons;
