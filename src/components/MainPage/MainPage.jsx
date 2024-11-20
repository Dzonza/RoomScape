import { useDispatch, useSelector } from 'react-redux';
import About from './About/About';
import Bookings from './Bookings/Bookings';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import './mainPage.scss';
import Search from './Search/Search';
import { useEffect } from 'react';
import { load } from '/src/States/loadingBookingsSlice';

const MainPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(load());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <div className="main-page">
        <Home />
        <About />
        {isLoggedIn ? <Bookings /> : ''}
        <Search />
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
