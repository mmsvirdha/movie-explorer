import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  PlayArrow,
  Star,
} from "@mui/icons-material";
import api, { img } from "../api";
import { useApp } from "../context/AppContext";

export default function MovieDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { isFav, toggleFav } = useApp();
  const [m, setM] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setM(null);
    setErr("");
    api
      .get(`/movie/${id}`, { params: { append_to_response: "credits,videos" } })
      .then((r) => setM(r.data))
      .catch((e) => setErr(e.message));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (err)
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {err}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => nav(-1)}
          sx={{ mt: 2 }}
        >
          Go back
        </Button>
      </Container>
    );

  if (!m)
    return (
      <Box textAlign="center" py={12}>
        <CircularProgress />
      </Box>
    );

  const trailer = m.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const fav = isFav(m.id);
  const backdrop = m.backdrop_path
    ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
    : null;

  return (
    <Box>
      {/* BACKDROP HERO */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 360, md: 520 },
          backgroundImage: backdrop
            ? `linear-gradient(180deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.85) 60%, rgba(10,10,15,1) 100%), url(${backdrop})`
            : "linear-gradient(180deg, #1a1a26, #0a0a0f)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 3 } }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => nav(-1)}
            sx={{
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              borderRadius: 999,
              px: 2,
              "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
            }}
          >
            Back
          </Button>
        </Container>
      </Box>

      {/* CONTENT */}
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: -18, md: -26 }, position: "relative", pb: 6 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          {/* Poster */}
          <Box
            component="img"
            src={img(m.poster_path, "w500")}
            alt={m.title}
            sx={{
              width: { xs: "60%", sm: "45%", md: 320 },
              borderRadius: 3,
              boxShadow:
                "0 30px 60px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}
          />

          {/* Info */}
          <Box flex={1} sx={{ pt: { md: 4 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.03em",
                fontSize: { xs: "1.9rem", sm: "2.6rem", md: "3.2rem" },
                lineHeight: 1.05,
                color: "#fff",
                textShadow: "0 4px 30px rgba(0,0,0,0.9)",
              }}
            >
              {m.title}
            </Typography>

            {m.tagline && (
              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  fontStyle: "italic",
                  mt: 0.5,
                }}
              >
                {m.tagline}
              </Typography>
            )}

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              flexWrap="wrap"
              sx={{ mt: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Star sx={{ color: "#fbbf24", fontSize: 20 }} />
                <Typography sx={{ color: "#fff", fontWeight: 700 }}>
                  {m.vote_average?.toFixed(1)}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                  / 10
                </Typography>
              </Stack>
              <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.3)" }} />
              <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                {m.release_date || "N/A"}
              </Typography>
              {m.runtime ? (
                <>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.3)" }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                    {m.runtime} min
                  </Typography>
                </>
              ) : null}
            </Stack>

            <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 2.5 }}>
              {m.genres?.map((g) => (
                <Chip
                  key={g.id}
                  label={g.name}
                  sx={{
                    bgcolor: "rgba(167,139,250,0.12)",
                    color: "#c4b5fd",
                    border: "1px solid rgba(167,139,250,0.3)",
                  }}
                />
              ))}
            </Stack>

            <Typography
              variant="h6"
              sx={{ mt: 3, mb: 1, fontWeight: 800, color: "#fff" }}
            >
              Overview
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              {m.overview || "No overview available."}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 3.5 }}
            >
              <Button
                size="large"
                variant="contained"
                startIcon={fav ? <Favorite /> : <FavoriteBorder />}
                onClick={() => toggleFav(m)}
              >
                {fav ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
              {trailer && (
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Trailer
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>

        {/* CAST */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, mb: 2.5, color: "#fff" }}
          >
            Top Cast
          </Typography>
          <Stack
            direction="row"
            spacing={2.5}
            sx={{
              overflowX: "auto",
              pb: 2,
              "&::-webkit-scrollbar": { height: 6 },
            }}
          >
            {m.credits?.cast?.slice(0, 15).map((c) => (
              <Stack
                key={c.id}
                alignItems="center"
                sx={{ minWidth: 100, textAlign: "center" }}
              >
                <Avatar
                  src={c.profile_path ? img(c.profile_path, "w185") : undefined}
                  sx={{
                    width: 84,
                    height: 84,
                    mb: 1,
                    border: "2px solid rgba(167,139,250,0.35)",
                    boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)",
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: "#fff", lineHeight: 1.2 }}
                >
                  {c.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {c.character}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* TRAILER EMBED */}
        {trailer && (
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 2.5, color: "#fff" }}
            >
              Trailer
            </Typography>
            <Box
              sx={{
                position: "relative",
                pt: "56.25%",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 30px 60px -20px rgba(0,0,0,0.9)",
              }}
            >
              <iframe
                title={trailer.name}
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}