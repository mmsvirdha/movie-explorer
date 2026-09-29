import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DarkMode,
  Favorite,
  LightMode,
  Logout,
  Movie as MovieIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { mode, toggleTheme, logout, favorites } = useApp();
  const nav = useNavigate();

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 1 }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            mr: 2,
            textDecoration: "none",
            flexGrow: { xs: 1, md: 0 },
          }}
        >
         <Box
  component="img"
  src="/logo.png"
  alt="Movie Explorer"
  sx={{
    width: 34,
    height: 34,
    borderRadius: 2,
    objectFit: "cover",
    boxShadow: "0 8px 20px -8px rgba(124,58,237,0.7)",
  }}
/>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.02em",
              display: { xs: "none", sm: "block" },
            }}
          >
            Movie Explorer
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={Link}
          to="/"
          sx={{
            color: "text.primary",
            display: { xs: "none", sm: "inline-flex" },
          }}
        >
          Home
        </Button>

        <Tooltip title="Favorites">
          <IconButton
            component={Link}
            to="/favorites"
            sx={{ color: "text.primary" }}
          >
            <Badge
              badgeContent={favorites.length}
              color="secondary"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 10,
                  minWidth: 18,
                  height: 18,
                  fontWeight: 700,
                },
              }}
            >
              <Favorite fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
          <IconButton onClick={toggleTheme} sx={{ color: "text.primary" }}>
            {mode === "dark" ? (
              <LightMode fontSize="small" />
            ) : (
              <DarkMode fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton
            onClick={() => {
              logout();
              nav("/login");
            }}
            sx={{ color: "text.primary" }}
          >
            <Logout fontSize="small" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}