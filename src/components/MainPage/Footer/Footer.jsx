import './footer.scss';
import Logo from '/src/components/ReusableComponents/Logo/Logo';
import FooterImage from './FooterImage/FooterImage';
import instagram from '/src/assets/instagram.svg';
import facebook from '/src/assets/facebook.svg';
import twitter from '/src/assets/twitter.svg';
import { useMemo } from 'react';
const Footer = () => {
  const handleDate = useMemo(() => {
    const date = new Date();
    return date.getFullYear();
  }, []);

  return (
    <section className="footer-container">
      <Logo logoStyle="footer-logo" />
      <article className="footer-container__icon-container">
        <FooterImage image={instagram} src="instagram image" />
        <FooterImage image={facebook} src="facebook image" />
        <FooterImage image={twitter} src="twitter image" />
      </article>
      <p className="footer-container__text">
        &copy; {handleDate}
        <span className="footer-container__text-company-name"> RoomScape</span>.
        All rights are reserved.
      </p>
    </section>
  );
};

export default Footer;
