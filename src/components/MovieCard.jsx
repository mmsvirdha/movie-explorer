import {
  Box,
  Card,
  CardActionArea,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  PlayArrow,
  Star,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { img } from "../api";
import { useApp } from "../context/AppContext";

export default function MovieCard({ movie }) {
  const nav = useNavigate();
  const { isFav, toggleFav } = useApp();
  const fav = isFav(movie.id);
  const year = movie.release_date?.slice(0, 4) || "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "-";

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        borderRadius: 3,
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "rgba(167,139,250,0.5)",
          boxShadow:
            "0 24px 60px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(167,139,250,0.2)",
        },
        "&:hover .poster-img": { transform: "scale(1.06)" },
        "&:hover .poster-overlay": { opacity: 1 },
        "&:hover .poster-play": { transform: "scale(1)" },
      }}
    >
      <CardActionArea onClick={() => nav(`/movie/${movie.id}`)}>
        {/* Poster wrapper (for zoom + overlay) */}
        <Box
          sx={{
            position: "relative",
            aspectRatio: "2 / 3",
            overflow: "hidden",
            bgcolor: "#0b0b12",
          }}
        >
          <Box
            component="img"
            className="poster-img"
            src={img(movie.poster_path)}
            alt={movie.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(.2,.9,.3,1)",
            }}
          />

          {/* Dark gradient overlay */}
          <Box
            className="poster-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              transition: "opacity 0.35s ease",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.9) 100%)",
            }}
          />

          {/* Rating pill (top-left) */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.4}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              px: 1,
              py: 0.4,
              borderRadius: 999,
              bgcolor: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Star sx={{ fontSize: 14, color: "#fbbf24" }} />
            <Typography
              variant="caption"
              sx={{ color: "#fff", fontWeight: 700, fontSize: "0.7rem" }}
            >
              {rating}
            </Typography>
          </Stack>

          {/* Play button (center, on hover) */}
          <Box
            className="poster-play"
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              transform: "scale(0.6)",
              transition: "transform 0.35s cubic-bezier(.2,.9,.3,1)",
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background:
                  "linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)",
                boxShadow: "0 10px 30px -6px rgba(124,58,237,0.7)",
              }}
            >
              <PlayArrow sx={{ color: "#fff", fontSize: 32 }} />
            </Box>
          </Box>
        </Box>

        {/* Info */}
        <Box sx={{ p: 1.5 }}>
          <Typography
            variant="subtitle2"
            noWrap
            title={movie.title}
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {movie.title}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {year}
          </Typography>
        </Box>
      </CardActionArea>

      {/* Favorite button (top-right) */}
      <IconButton
        aria-label="toggle favorite"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          toggleFav(movie);
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: fav ? "#fb7185" : "#fff",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.85)",
            transform: "scale(1.08)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {fav ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      </IconButton>
    </Card>
  );
}