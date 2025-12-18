const Videocard = ({ video, onClick }) => {
  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        loading="lazy"
      />
      <div className="play-icon">
        ▶
      </div>
    </div>
  );
};

export default Videocard;
