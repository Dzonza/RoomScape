import { useMemo } from 'react';
import './cardDescription.scss';

const CardDescription = ({ onClick, resultData }) => {
  const handlePrice = useMemo(() => {
    if (!resultData.price.toString().includes('$')) {
      return `$${resultData.price}`;
    }
    return resultData.price;
  }, [resultData.price]);

  const apartmentListingName = useMemo(() => {
    const maxLetters = 35;
    return resultData.listingName.length > maxLetters
      ? resultData.listingName.slice(0, maxLetters) + '...'
      : resultData.listingName;
  }, [resultData.listingName]);

  return (
    <section className="card-container__description" onClick={onClick}>
      <p className="card-container__text">{apartmentListingName}</p>
      <p className="card-container__text">{resultData.listingBedLabel}</p>
      <p className="card-container__price">{handlePrice}</p>
    </section>
  );
};

export default CardDescription;
