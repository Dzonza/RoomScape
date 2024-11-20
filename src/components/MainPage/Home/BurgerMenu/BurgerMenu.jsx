import './burgerMenu.scss';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '/src/States/authSlice';
import { useRef } from 'react';
import useWindowSize from '/src/components/customHooks/useWindowSize';
import NavLinks from '/src/components/MainPage/Home/NavLinks/NavLinks';
const BurgerMenu = ({ inView }) => {
  const dispatch = useDispatch();
  const checkbox = useRef();
  const { width } = useWindowSize();
  useEffect(() => {
    const user = sessionStorage.getItem('currentUserId');
    if (user) dispatch(login());
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    sessionStorage.setItem('currentUserId', '');
    dispatch(logout());
    checkbox.current.checked = false;
  }, [dispatch]);

  const handleClickedLink = useCallback(() => {
    if (checkbox.current.checked) {
      checkbox.current.checked = false;
    }
  }, []);
  return (
    <>
      <section
        className={`burger-navigation ${
          !inView
            ? 'visible'
            : `${
                checkbox.current.checked
                  ? 'visible'
                  : `${width <= 600 ? 'visible' : ''}`
              }`
        }`}
      >
        <input
          type="checkbox"
          className="burger-navigation__checkbox"
          id="navi-toggle"
          ref={checkbox}
        />

        <label
          htmlFor="navi-toggle"
          className={`burger-navigation__button ${
            !inView
              ? 'button-move-in-view'
              : `${
                  checkbox.current.checked
                    ? 'button-move-in-view'
                    : `${width <= 600 ? 'button-move-in-view' : ''}`
                }`
          }`}
        >
          <span className="burger-navigation__icon">&nbsp;</span>
        </label>

        <div
          className={`burger-navigation__background ${
            !inView
              ? 'button-move-in-view'
              : `${
                  checkbox.current.checked
                    ? 'button-move-in-view'
                    : `${width <= 600 ? 'button-move-in-view' : ''}`
                }`
          }`}
        >
          &nbsp;
        </div>
        <section className="burger-navigation__nav">
          <NavLinks
            onClick={handleClickedLink}
            onClickLogOut={handleLogout}
            linkStyle="burger-navigation"
          />
        </section>
      </section>
    </>
  );
};

export default BurgerMenu;
