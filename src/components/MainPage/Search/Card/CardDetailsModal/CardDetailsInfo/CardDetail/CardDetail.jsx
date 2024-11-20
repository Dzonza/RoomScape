import './cardDetail.scss';

const CardDetail = ({ label, labelData, descriptionContainer }) => {
  return (
    <article
      className={`card-modal-details__text-container ${
        descriptionContainer ? 'description-container' : ''
      }`}
    >
      <p className="card-modal-details__text-title">{label}</p>
      <p
        className={`card-modal-details__text ${
          descriptionContainer ? 'description-container__text' : ''
        }`}
      >
        {labelData}
      </p>
    </article>
  );
};

export default CardDetail;
