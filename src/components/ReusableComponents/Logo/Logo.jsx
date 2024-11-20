import './logo.scss';
import logo from '/src/assets/roomscape-orange.png';
const Logo = ({ logoStyle }) => {
  return <img className={logoStyle} src={logo} alt="RoomScape logo" />;
};

export default Logo;
