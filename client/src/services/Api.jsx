const BASE_URL = "http://localhost:5050";

export const fetchVideos = async (page = 1, limit = 12) => {
  const res = await fetch(
    `${BASE_URL}/api/videos?page=${page}&limit=${limit}`
  );
  return res.json();
};
