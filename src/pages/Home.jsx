import { useEffect, useRef } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { AutoAwesome, TrendingUp, TuneRounded } from "@mui/icons-material";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import { useApp } from "../context/AppContext";

const years = Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i);

export default function Home() {
  const {
    q,
    search,
    items,
    loading,
    error,
    retry,
    page,
    pages,
    loadMore,
    genres,
    filters,
    setFilters,
    listMode,
  } = useApp();

  const sentinel = useRef(null);
  const more = useRef();
  more.current = loadMore;

  useEffect(() => {
    if (listMode !== "search" || !sentinel.current) return;
    const o = new IntersectionObserver(
      ([e]) => e.isIntersecting && more.current(),
      { rootMargin: "300px" }
    );
    o.observe(sentinel.current);
    return () => o.disconnect();
  }, [listMode, items.length]);

  const set = (k) => (e) => setFilters({ ...filters, [k]: e.target.value });

  const title =
    listMode === "search"
      ? `Results for "${q}"`
      : listMode === "discover"
      ? "Filtered Movies"
      : "Trending This Week";

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          mb: 4,
          p: { xs: 3, md: 6 },
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(244,63,94,0.08) 50%, rgba(10,10,15,0) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 65%)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />
        <Box sx={{ position: "relative", maxWidth: 720 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
            <AutoAwesome sx={{ color: "primary.main", fontSize: 18 }} />
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: "0.15em",
                fontWeight: 700,
              }}
            >
              Discover
            </Typography>
          </Stack>
         <Typography
  variant="h3"
  sx={{
    fontWeight: 900,
    letterSpacing: "-0.03em",
    fontSize: { xs: "1.9rem", sm: "2.6rem", md: "3.2rem" },
    mb: 1,
    background: (theme) =>
      theme.palette.mode === "dark"
        ? "linear-gradient(90deg, #ffffff 0%, #c4b5fd 70%, #f43f5e 120%)"
        : "linear-gradient(90deg, #1a1233 0%, #6d28d9 55%, #e11d48 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1.05,
  }}
>
  Find your next favorite movie
</Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 3, maxWidth: 560 }}
          >
            Search thousands of films, explore what's trending, and build your
            personal watchlist - all in one place.
          </Typography>

          <Box sx={{ maxWidth: 600 }}>
            <SearchBar key={q} initial={q} onSearch={search} />
          </Box>
        </Box>
      </Box>

      {/* FILTERS */}
      {!q && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.06)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
            <TuneRounded sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", letterSpacing: "0.15em" }}
            >
              Filters
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ sm: "center" }}
          >
            <FormControl size="small" fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select label="Genre" value={filters.genre} onChange={set("genre")}>
                <MenuItem value="">All</MenuItem>
                {genres.map((g) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Year</InputLabel>
              <Select label="Year" value={filters.year} onChange={set("year")}>
                <MenuItem value="">Any</MenuItem>
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Min rating</InputLabel>
              <Select
                label="Min rating"
                value={filters.rating}
                onChange={set("rating")}
              >
                <MenuItem value="">Any</MenuItem>
                {[5, 6, 7, 8, 9].map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}+
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => setFilters({ genre: "", year: "", rating: "" })}
              sx={{ minWidth: 100 }}
            >
              Reset
            </Button>
          </Stack>
        </Box>
      )}

      {/* SECTION HEADING */}
      <Stack direction="row" alignItems="center" spacing={1.2} mb={2.5}>
        {listMode === "trending" && (
          <TrendingUp sx={{ color: "primary.main", fontSize: 22 }} />
        )}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </Typography>
      </Stack>

      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={retry}>
              Retry
            </Button>
          }
          sx={{ mb: 2, borderRadius: 2 }}
        >
          {error}
        </Alert>
      )}

      {items.length > 0 && <MovieGrid movies={items} />}

      {!loading && !error && items.length === 0 && (
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            🎬 Nothing here yet
          </Typography>
          <Typography color="text.secondary">
            Try a different search or reset the filters.
          </Typography>
        </Box>
      )}

      {loading && (
        <Box textAlign="center" py={5}>
          <CircularProgress />
        </Box>
      )}

      <div ref={sentinel} style={{ height: 1 }} />

      {listMode !== "search" && !loading && page < pages && items.length > 0 && (
        <Box textAlign="center" py={4}>
          <Button variant="outlined" size="large" onClick={loadMore}>
            Load More
          </Button>
        </Box>
      )}
    </Container>
  );
}