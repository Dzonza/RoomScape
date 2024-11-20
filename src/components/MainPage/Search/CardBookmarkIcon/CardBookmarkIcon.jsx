import { useCallback } from 'react';
import './cardBookmarkIcon.scss';

const CardBookmarkIcon = ({ resultCard, isClicked, setIsClicked }) => {
  const handleIconClick = useCallback(() => {
    if (!isClicked) {
      async function addingBookmark() {
        try {
          await fetch(`http://localhost:3000/bookmarks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: sessionStorage.getItem('currentUserId'),
              apartmentId: resultCard.id,
              apartment: resultCard,
            }),
          });
          setIsClicked(true);
        } catch (e) {
          console.error(e);
        }
      }
      addingBookmark();
    } else {
      async function deleteBookmark() {
        try {
          const response = await fetch(
            `http://localhost:3000/bookmarks?userId=${sessionStorage.getItem(
              'currentUserId'
            )}&apartmentId=${resultCard.id}`
          );
          const result = await response.json();

          await fetch(`http://localhost:3000/bookmarks/${result[0].id}`, {
            method: 'DELETE',
          });
          setIsClicked(false);
        } catch (e) {
          console.error(e);
        }
      }
      deleteBookmark();
    }
  }, [resultCard, isClicked, setIsClicked]);

  return (
    <div className="card-container__bookmark">
      <svg
        onClick={handleIconClick}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className={`card-container__bookmark-icon ${
          isClicked ? 'icon-color' : ''
        }`}
      >
        <path d="M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4z" />
        <path d="M0 0h48v48H0z" fill="none" stroke="none" />
      </svg>
    </div>
  );
};

export default CardBookmarkIcon;
