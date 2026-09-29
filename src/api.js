// All TMDb requests go through this axios instance.
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}` },
  params: { language: "en-US" },
});

// Turn raw axios errors into user-friendly messages.
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const s = err.response?.status;
    let msg = "Something went wrong. Please try again.";
    if (!err.response) msg = "Network error. Check your internet connection.";
    else if (s === 401) msg = "TMDb authentication failed. Check your API token.";
    else if (s === 404) msg = "We couldn't find what you were looking for.";
    else if (s === 429) msg = "Too many requests. Please wait a moment.";
    return Promise.reject(new Error(msg));
  }
);

export const img = (path, size = "w500") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='750'><rect width='100%' height='100%' fill='#555'/><text x='50%' y='50%' fill='#ddd' font-size='36' text-anchor='middle'>No Poster</text></svg>`
      );

export default api;
