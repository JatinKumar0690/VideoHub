import "./VideoModal.css";

const VideoModel = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <video
          src={video.videoUrl}
          controls
          autoPlay
          className="modal-video"
        />
      </div>
    </div>
  );
};

export default VideoModel;
