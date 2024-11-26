import { useCallback, useEffect, useState } from 'react';
import Logo from '/src/components/ReusableComponents/Logo/Logo';
import CardDetailLocation from './CardDetailLocation/CardDetailLocation';
import CardDetailsInfo from './CardDetailsInfo/CardDetailsInfo';
import './cardDetailsModal.scss';
import ImageSwiper from './ImageSwiper/ImageSwiper';
import ExitBtn from '/src/components/ReusableComponents/ExitBtn/ExitBtn';
import CardDetailsModalBg from './CardDetailsModalBg/CardDetailsModalBg';
import CardDetailsBooking from './CardDetailsbooking/CardDetailsBooking';
import { useDispatch } from 'react-redux';
import { close } from '/src/States/bookingModalSlice';
import { createPortal } from 'react-dom';

const CardDetailsModal = ({ resultData }) => {
  const [apartmentInfo, setAparmtentInfo] = useState([]);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getInfoData() {
      try {
        const response = await fetch(
          `https://airbnb19.p.rapidapi.com/api/v2/getPropertyDetails?propertyId=${resultData.id}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key':
                '1f7f07205emshcdc2654c5e66794p1f59ecjsn768b62a3e37d',
              'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
            },
          }
        );
        const result = await response.json();
        setAparmtentInfo(result.data);
        setLoader(false);
      } catch (e) {
        console.error(e);
      }
    }
    getInfoData();
  }, [resultData.id]);

  const handleModalExitBtn = useCallback(() => {
    dispatch(close());
  }, [dispatch]);
  return createPortal(
    <section className="card-detail-container">
      <CardDetailsModalBg />
      <ExitBtn onClick={handleModalExitBtn} exitBtnStyle="modal-exit-btn" />
      <Logo logoStyle="card-detail-logo" />
      <ImageSwiper images={resultData.images} />
      <section className="card-detail-container__info-section">
        <CardDetailsInfo
          resultData={resultData}
          apartmentInfo={apartmentInfo}
          loader={loader}
        />
        <CardDetailLocation resultData={apartmentInfo} loader={loader} />
      </section>
      <CardDetailsBooking apartmentInfo={apartmentInfo} />
    </section>,
    document.querySelector('body')
  );
};

export default CardDetailsModal;
