import './footerImage.scss';

const FooterImage = ({ image, src }) => {
  return <img src={image} alt={src} className="footer-image" />;
};

export default FooterImage;
