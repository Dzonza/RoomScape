import './about.scss';
import AboutCard from './AboutCard/AboutCard';
import hearth from '/src/assets/hearth.svg';
import money from '/src/assets/money.svg';
import palms from '/src/assets/palms.svg';
import keys from '/src/assets/keys.svg';

const About = () => {
  return (
    <section className="about-container" id="about">
      <h2 className="about-container__title">About</h2>
      <div className="about-container__all-cards">
        <AboutCard
          image={hearth}
          alt="image of hearth"
          message="RoomScape is committed to exceptional customer care, ensuring every stay
        is safe, comfortable, and seamless. With 24/7 support and high standards
        for listings, were here to make every trip feel like home."
          cardInViewStyle="about-first-card"
        />
        <AboutCard
          image={money}
          alt="image of money"
          message="RoomScape offers a Money-Back Guarantee to give you peace of mind. If your stay doesnt meet our standards, were committed to making it right or refunding your booking."
          cardInViewStyle="about-second-card"
        />
        <AboutCard
          image={palms}
          alt="image of palm tree"
          message="RoomScape is dedicated to providing the best travel experience. From unique stays to personalized support, we ensure every trip is memorable and tailored to your needs."
          cardInViewStyle="about-third-card"
        />
        <AboutCard
          image={keys}
          alt="image of keys"
          message="RoomScape ensures fast communication with hosts and offers a wide selection of the best apartments, making it easy to find the perfect stay for your needs."
          cardInViewStyle="about-fourth-card"
        />
      </div>
    </section>
  );
};

export default About;
