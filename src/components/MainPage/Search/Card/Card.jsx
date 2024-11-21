import { useCallback, useEffect, useState } from 'react';
import './card.scss';
import CardBookmarkIcon from '../CardBookmarkIcon/CardBookmarkIcon';
import { useDispatch, useSelector } from 'react-redux';
import CardDetailsModal from './CardDetailsModal/CardDetailsModal';
import { open } from '/src/States/bookingModalSlice';
import CardImage from '/src/components/MainPage/Search/Card/CardImage/CardImage';
import CardTitleRating from '/src/components/MainPage/Search/Card/CardTitleRating/CardTitleRating';
import CardDescription from './CardDescription/CardDescription';
import { useInView } from 'react-intersection-observer';
const Card = ({ resultData }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isOpenedId = useSelector((state) => state.bookingModal.isOpenedId);
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!isLoggedIn) return;
    async function checkUserBookmarks() {
      try {
        const response = await fetch(
          `http://localhost:3000/bookmarks?userId=${sessionStorage.getItem(
            'currentUserId'
          )}`
        );
        const result = await response.json();
        if (result.length === 0) return;
        result.forEach((bookmark) => {
          if (bookmark.apartmentId === resultData.id) setIsClicked(true);
        });
      } catch (e) {
        console.error(e);
      }
    }

    checkUserBookmarks();
  }, [resultData.id, isLoggedIn]);

  useEffect(() => {
    if (isOpenedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpenedId]);

  const handleOpeningModal = useCallback(() => {
    dispatch(open(resultData.id));
  }, [dispatch, resultData.id]);

  return (
    <>
      {isOpenedId === resultData.id ? (
        <CardDetailsModal resultData={resultData} />
      ) : (
        ''
      )}
      <article
        className={`card-container ${inView ? 'card-in-view' : ''}`}
        ref={ref}
      >
        {isLoggedIn ? (
          <CardBookmarkIcon
            resultCard={resultData}
            setIsClicked={setIsClicked}
            isClicked={isClicked}
          />
        ) : (
          ''
        )}
        <CardImage onClick={handleOpeningModal} resultData={resultData} />
        <CardTitleRating onClick={handleOpeningModal} resultData={resultData} />
        <CardDescription onClick={handleOpeningModal} resultData={resultData} />
      </article>
    </>
  );
};

export default Card;
