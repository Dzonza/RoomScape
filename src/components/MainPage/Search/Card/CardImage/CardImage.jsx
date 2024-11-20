import './cardImage.scss';

const CardImage = ({ onClick, resultData }) => {
  return (
    <div className="card-container__image" onClick={onClick}>
      <img
        className="card-container__image"
        src={resultData.images[0]}
        alt="image of apartment"
      />
    </div>
  );
};

export default CardImage;
