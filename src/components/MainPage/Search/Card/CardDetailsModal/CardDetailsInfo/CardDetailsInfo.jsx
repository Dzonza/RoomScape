import './cardDetailsInfo.scss';
import Spinner from '/src/components/ReusableComponents/Spinner/Spinner';
import infinity from '/src/assets/infinity.svg';
import { useMemo } from 'react';
import CardDetail from './CardDetail/CardDetail';
const CardDetailsInfo = ({ resultData, apartmentInfo, loader }) => {
  const handleDescriptionText = useMemo(() => {
    return (text) => text.replaceAll('<br />', '');
  }, []);

  return (
    <section className="card-modal-details">
      {loader ? (
        <Spinner spinnerImage={infinity} />
      ) : (
        <>
          <h3>{apartmentInfo.title}</h3>
          <div className="card-modal-details__info">
            <CardDetail label="City" labelData={resultData.localizedCityName} />
            <CardDetail
              label="Overall rating"
              labelData={
                apartmentInfo.guestSatisfactionOverall
                  ? apartmentInfo.guestSatisfactionOverall
                  : '-'
              }
            />
            <CardDetail
              label="Person capacity"
              labelData={apartmentInfo.personCapacity}
            />
            <CardDetail
              label="Kids"
              labelData={apartmentInfo.allowsChildren ? 'Yes' : 'No'}
            />
            <CardDetail
              label="Pets"
              labelData={apartmentInfo.allowsPets ? 'Yes' : 'No'}
            />
            <CardDetail label="Bathrooms" labelData={resultData.bathrooms} />
            <CardDetail label="Bedrooms" labelData={resultData.bedrooms} />
            <CardDetail label="Beds" labelData={resultData.beds} />
            <CardDetail
              label="Price"
              labelData={resultData.accessibilityLabel}
            />
          </div>
          <CardDetail
            label={apartmentInfo.sections.description.title}
            labelData={handleDescriptionText(
              apartmentInfo.sections.description.items[0].html.htmlText
            )}
            descriptionContainer={true}
          />
        </>
      )}
    </section>
  );
};

export default CardDetailsInfo;
