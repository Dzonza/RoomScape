import { useInView } from 'react-intersection-observer';
import './aboutCard.scss';

const AboutCard = ({ image, alt, message, cardInViewStyle }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  return (
    <article
      className={`about-card-container ${inView ? cardInViewStyle : ''}`}
      ref={ref}
    >
      <img src={image} alt={alt} className="about-card-container__img" />
      <p className="about-card-container__text">{message}</p>
    </article>
  );
};

export default AboutCard;
