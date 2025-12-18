import { useEffect, useState } from "react";
import { fetchVideos } from "../services/Api.jsx";
import Videogrid from "../components/Videogrid.jsx";
import VideoModel from "../components/VideoModel.jsx";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const LIMIT = 12;

  const loadVideos = async (pageNumber) => {
    setLoading(true);

    const data = await fetchVideos(pageNumber, LIMIT);

    if (data.videos.length < LIMIT) {
      setHasMore(false); // no more videos
    }

    setVideos((prev) => [...prev, ...data.videos]);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos(page);
  }, [page]);

  return (
    <>
      <h1 style={{ padding: "20px" }}>Explore Videos</h1>

      <Videogrid
        videos={videos}
        onVideoClick={setSelectedVideo}
      />

      {hasMore && (
        <div style={{ textAlign: "center", margin: "30px" }}>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: "#1f1f1f",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      <VideoModel
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
};

export default Home;