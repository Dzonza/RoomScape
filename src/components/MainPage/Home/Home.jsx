import { useInView } from 'react-intersection-observer';
import Logo from '/src/components/ReusableComponents/Logo/Logo';
import Nav from './Nav/Nav';
import './home.scss';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import happyFamily from '/src/assets/happy-family.mp4';
import BgVideo from '../../ReusableComponents/BgVideo/BgVideo';
const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  return (
    <>
      <div id="home" ref={ref}>
        <div className="main-container">
          <Nav />
          <BgVideo video={happyFamily} videoStyle="bg-video-family" />
        </div>
        <div className="house-img"></div>
        <Logo logoStyle="home-logo" />
        <BurgerMenu inView={inView} />
      </div>
    </>
  );
};

export default Home;
