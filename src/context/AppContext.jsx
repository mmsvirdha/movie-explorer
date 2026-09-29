// Context API: Auth + Theme + Movies (search, trending, filters, favorites).
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import api from "../api";
import { getTheme } from "../theme";

const ls = (k, d) => {
  try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }
  catch { return d; }
};
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

const Ctx = createContext();
export const useApp = () => useContext(Ctx);

export function Providers({ children }) {
  // ----- Auth (demo login: admin / movie123) -----
  const [user, setUser] = useState(ls("me_user", null));
  const login = (u, p) => {
    if (u.trim() === "admin" && p === "movie123") {
      setUser({ username: "admin" }); save("me_user", { username: "admin" });
      return true;
    }
    return false;
  };
  const logout = () => { setUser(null); localStorage.removeItem("me_user"); };

  // ----- Theme -----
  const [mode, setMode] = useState(ls("me_theme", "dark"));
  const toggleTheme = () => setMode((m) => { const n = m === "dark" ? "light" : "dark"; save("me_theme", n); return n; });
  const theme = useMemo(() => getTheme(mode), [mode]);

  // ----- Movies -----
  const [q, setQ] = useState(ls("me_last_search", ""));   // last search persisted
  const [filters, setFilters] = useState({ genre: "", year: "", rating: "" });
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState(ls("me_favorites", []));

  const hasFilter = !!(filters.genre || filters.year || filters.rating);
  const listMode = q ? "search" : hasFilter ? "discover" : "trending";

  const fetchPage = async (p) => {
    setLoading(true); setError("");
    try {
      let res;
      if (q) res = await api.get("/search/movie", { params: { query: q, page: p, include_adult: false } });
      else if (hasFilter)
        res = await api.get("/discover/movie", {
          params: {
            page: p, sort_by: "popularity.desc", "vote_count.gte": 50,
            with_genres: filters.genre || undefined,
            primary_release_year: filters.year || undefined,
            "vote_average.gte": filters.rating || undefined,
          },
        });
      else res = await api.get("/trending/movie/week", { params: { page: p } });
      const d = res.data;
      setItems((prev) => (p === 1 ? d.results : [...prev, ...d.results]));
      setPage(p); setPages(Math.min(d.total_pages || 1, 500));
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (user) fetchPage(1); }, [q, filters, user]);
  useEffect(() => {
    if (user) api.get("/genre/movie/list").then((r) => setGenres(r.data.genres)).catch(() => {});
  }, [user]);

  const search = (text) => { const t = text.trim(); setQ(t); save("me_last_search", t); };
  const loadMore = () => { if (!loading && page < pages) fetchPage(page + 1); };
  const retry = () => fetchPage(1);

  const isFav = (id) => favorites.some((m) => m.id === id);
  const toggleFav = (m) => {
    const slim = { id: m.id, title: m.title, poster_path: m.poster_path, release_date: m.release_date, vote_average: m.vote_average };
    setFavorites((f) => {
      const n = f.some((x) => x.id === m.id) ? f.filter((x) => x.id !== m.id) : [...f, slim];
      save("me_favorites", n); return n;
    });
  };

  return (
    <Ctx.Provider value={{ user, login, logout, mode, toggleTheme, q, search, filters, setFilters, items, loading, error, retry, page, pages, loadMore, genres, favorites, isFav, toggleFav, listMode }}>
      <MuiTheme theme={theme}><CssBaseline />{children}</MuiTheme>
    </Ctx.Provider>
  );
}
