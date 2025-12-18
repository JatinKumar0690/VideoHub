import Videocard from "./Videocard";
import "./Videogrid.css";

const Videogrid = ({ videos, onVideoClick }) => {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <Videocard
          key={video._id}
          video={video}
          onClick={onVideoClick}
        />
      ))}
    </div>
  );
};


export default Videogrid;
