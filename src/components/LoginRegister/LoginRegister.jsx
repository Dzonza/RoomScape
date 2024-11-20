import { useState, useEffect } from 'react';
import BgVideo from '/src/components/ReusableComponents/BgVideo/BgVideo';
import MainSection from './MainSection/MainSectuion';
import './loginRegister.scss';
import { useLocation } from 'react-router-dom';
import housesVideo from '../../assets/houses.mp4';
const LoginRegister = () => {
  const [overlay, setOverlay] = useState(true);
  const location = useLocation();
  const { formType } = location.state || {};

  useEffect(() => {
    if (formType === 'register') setOverlay((prevValue) => !prevValue);
  }, [formType]);

  return (
    <>
      <BgVideo video={housesVideo} videoStyle="loginRegister-bg-video" />
      <MainSection overlay={overlay} setOverlay={setOverlay} />
    </>
  );
};

export default LoginRegister;
