import { Container, Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useApp } from "../context/AppContext";

export default function Favorites() {
  const { favorites } = useApp();
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>My Favorites</Typography>
      {favorites.length ? <MovieGrid movies={favorites} /> : (
        <Typography color="text.secondary" textAlign="center" sx={{ py: 8 }}>No favorites yet. Tap the heart on any movie to save it.</Typography>
      )}
    </Container>
  );
}
