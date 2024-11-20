import './bgVideo.scss';

const BgVideo = ({ video, videoStyle }) => {
  return (
    <>
      <div className={videoStyle}>
        <video
          className={`${videoStyle}__content
        `}
          autoPlay
          muted
          loop
        >
          <source src={video} type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>
    </>
  );
};

export default BgVideo;
