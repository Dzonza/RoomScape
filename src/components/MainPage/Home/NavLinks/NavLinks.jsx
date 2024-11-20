import { useSelector } from 'react-redux';
import './navLinks.scss';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
const NavLinks = ({ onClick, onClickLogOut, linkStyle, dotStyle }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <ScrollLink
        className={`${linkStyle}__link link1`}
        to="home"
        smooth={true}
        duration={500}
        onClick={onClick ? onClick : undefined}
      >
        Home
        {dotStyle ? <div className={`${linkStyle}__dot dot`}></div> : ''}
      </ScrollLink>
      <ScrollLink
        className={`${linkStyle}__link link2`}
        to="about"
        smooth={true}
        duration={500}
        onClick={onClick ? onClick : undefined}
      >
        About
        {dotStyle ? <div className={`${linkStyle}__dot dot`}></div> : ''}
      </ScrollLink>
      <ScrollLink
        className={`${linkStyle}__link link3`}
        to="search"
        smooth={true}
        duration={500}
        onClick={onClick ? onClick : undefined}
      >
        Search
        {dotStyle ? <div className={`${linkStyle}__dot dot`}></div> : ''}
      </ScrollLink>
      {!isLoggedIn ? (
        <>
          <Link className={`${linkStyle}__link link4`} to="/LoginRegister">
            Login
            {dotStyle ? <div className={`${linkStyle}__dot dot`}></div> : ''}
          </Link>

          <Link
            className={`${linkStyle}__link link5`}
            to="/LoginRegister"
            state={{ formType: 'register' }}
          >
            Register
            {dotStyle ? <div className={`${linkStyle}__dot dot`}></div> : ''}
          </Link>
        </>
      ) : (
        <>
          <ScrollLink
            className={`${linkStyle}__link link4`}
            to="bookings"
            smooth={true}
            duration={500}
            onClick={onClick ? onClick : undefined}
          >
            Bookings
            {dotStyle ? <div className={`${linkStyle}__dot dot`}></div> : ''}
          </ScrollLink>
          <Link onClick={onClickLogOut} className={`${linkStyle}__link link5`}>
            Logout
            {dotStyle ? <div className={`${linkStyle}__dot dot`}></div> : ''}
          </Link>
        </>
      )}
    </>
  );
};

export default NavLinks;
