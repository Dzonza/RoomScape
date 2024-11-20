import { useCallback, useEffect } from 'react';
import './nav.scss';
import { login, logout } from '/src/States/authSlice';
import { useDispatch } from 'react-redux';
import useWindowSize from '/src/components/customHooks/useWindowSize';
import NavLinks from '../NavLinks/NavLinks';
const Nav = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  useEffect(() => {
    const user = sessionStorage.getItem('currentUserId');
    if (user) dispatch(login());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    sessionStorage.setItem('currentUserId', '');
    dispatch(logout());
  }, [dispatch]);

  const handleHoverLinks = useCallback((e, value) => {
    if (e.target.classList.contains('nav-container__link')) {
      const link = e.target;
      const siblings = link
        .closest('.nav-container')
        .querySelectorAll('.nav-container__link');
      siblings.forEach((sibling) => {
        if (sibling !== link) sibling.style.opacity = value;
      });
    }
  }, []);

  return (
    <>
      {width <= 600 ? (
        ''
      ) : (
        <header>
          <nav
            onMouseOver={(e) => {
              handleHoverLinks(e, 0.6);
            }}
            onMouseOut={(e) => {
              handleHoverLinks(e, 1);
            }}
            className="nav-container "
          >
            <NavLinks
              onClickLogOut={handleLogout}
              linkStyle="nav-container"
              dotStyle={true}
            />
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;
