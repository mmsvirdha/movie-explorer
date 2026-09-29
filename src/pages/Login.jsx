import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!u.trim() || !p) return setErr("Please enter username and password.");
    setBusy(true);
    // small delay for UX (loading state visible)
    setTimeout(() => {
      const ok = login(u, p);
      if (!ok) {
        setErr("Invalid username or password.");
        setBusy(false);
      }
    }, 350);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "#05050a",
      }}
    >
      {/* Background video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster=""
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.85,
        }}
      >
        <source src="/cinema-bg.mp4" type="video/mp4" />
      </Box>

      {/* Gradient overlay - darker on the LEFT to host the form */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(5,5,10,0.96) 0%, rgba(5,5,10,0.85) 35%, rgba(5,5,10,0.35) 65%, rgba(5,5,10,0.55) 100%)",
        }}
      />

      {/* Bottom vignette */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(120% 80% at 50% 110%, rgba(124,58,237,0.18), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Content grid - form on LEFT, cinematic space on RIGHT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(420px, 520px) 1fr" },
          alignItems: "center",
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 4, md: 6 },
          gap: 4,
        }}
      >
        {/* LOGIN CARD */}
        <Box
          className="animate-fade-in"
          sx={{
            width: "100%",
            maxWidth: 480,
            mx: { xs: "auto", md: 0 },
            p: { xs: 3, sm: 4.5 },
            borderRadius: 4,
            background: "rgba(15,15,22,0.72)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03) inset",
          }}
        >
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
            <Box
  component="img"
  src="/logo.png"
  alt="Movie Explorer"
  sx={{
    width: 44,
    height: 44,
    borderRadius: 2.5,
    objectFit: "cover",
    boxShadow: "0 10px 30px -10px rgba(124,58,237,0.7)",
  }}
/>
            <Box>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ lineHeight: 1, color: "#fff" }}
              >
                Movie Explorer
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.55)" }}
              >
                Discover your next favorite film
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2rem" },
              mb: 0.5,
            }}
          >
            Welcome back
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.55)", mb: 3 }}
          >
            Sign in to continue exploring movies.
          </Typography>

          {err && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 2,
                bgcolor: "rgba(244,63,94,0.1)",
                color: "#fecdd3",
                border: "1px solid rgba(244,63,94,0.25)",
                "& .MuiAlert-icon": { color: "#fb7185" },
              }}
            >
              {err}
            </Alert>
          )}

          <Stack
            component="form"
            onSubmit={submit}
            spacing={2.2}
            autoComplete="off"
          >
            <TextField
              label="Username"
              value={u}
              onChange={(e) => setU(e.target.value)}
              autoFocus
              fullWidth
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.04)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                  "&:hover fieldset": { borderColor: "rgba(167,139,250,0.6)" },
                  "&.Mui-focused fieldset": { borderColor: "#a78bfa" },
                },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
            />

            <TextField
              label="Password"
              type={showPw ? "text" : "password"}
              value={p}
              onChange={(e) => setP(e.target.value)}
              fullWidth
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.6)" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPw((s) => !s)}
                      edge="end"
                      sx={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.04)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                  "&:hover fieldset": { borderColor: "rgba(167,139,250,0.6)" },
                  "&.Mui-focused fieldset": { borderColor: "#a78bfa" },
                },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={busy}
              startIcon={!busy && <Lock />}
              sx={{
                mt: 0.5,
                py: 1.4,
                fontSize: "1rem",
                background:
                  "linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg,#6d28d9 0%,#8b5cf6 100%)",
                },
              }}
            >
              {busy ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
            </Button>
          </Stack>

          {/* Demo hint */}
          <Box
            sx={{
              mt: 3,
              p: 1.6,
              borderRadius: 2.5,
              bgcolor: "rgba(167,139,250,0.08)",
              border: "1px dashed rgba(167,139,250,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#a78bfa",
                boxShadow: "0 0 12px #a78bfa",
              }}
            />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
              Demo account&nbsp;
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  color: "#c4b5fd",
                  fontWeight: 700,
                }}
              >
                admin
              </Box>
              &nbsp;/&nbsp;
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  color: "#c4b5fd",
                  fontWeight: 700,
                }}
              >
                movie123
              </Box>
            </Typography>
          </Box>
        </Box>

        {/* RIGHT SIDE - clean on md+, hidden on mobile */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            height: "100%",
            pb: 4,
            pr: 2,
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)",
              fontWeight: 800,
              fontSize: { md: "1.5rem", lg: "2rem" },
              textAlign: "right",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 30px rgba(0,0,0,0.8)",
              maxWidth: 520,
            }}
          >
            Every great film
            <Box
              component="span"
              sx={{
                display: "block",
                background:
                  "linear-gradient(90deg,#a78bfa 0%,#f43f5e 60%,#fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              starts with a search.
            </Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.45)",
              mt: 1,
              textAlign: "right",
            }}
          >
            Powered by TMDb · Built with React &amp; MUI
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}