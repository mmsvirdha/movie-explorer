import { createTheme, alpha } from "@mui/material/styles";

export const getTheme = (mode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#a78bfa",       // soft violet
        light: "#c4b5fd",
        dark: "#7c3aed",
      },
      secondary: {
        main: "#f43f5e",       // cinematic red-pink
      },
      background: {
        default: isDark ? "#0a0a0f" : "#f7f7fa",
        paper: isDark ? "#12121a" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f5f5f7" : "#0f0f14",
        secondary: isDark ? "#9ca3af" : "#4b5563",
      },
      divider: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    },

    typography: {
      fontFamily:
        '"Inter", "Roboto", -apple-system, BlinkMacSystemFont, sans-serif',
      h1: { fontWeight: 800, letterSpacing: "-0.03em" },
      h2: { fontWeight: 800, letterSpacing: "-0.02em" },
      h3: { fontWeight: 800, letterSpacing: "-0.02em" },
      h4: { fontWeight: 700, letterSpacing: "-0.01em" },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 600 },
    },

    shape: { borderRadius: 14 },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: isDark
              ? "radial-gradient(1200px 600px at 20% 0%, rgba(124,58,237,0.08), transparent 60%), radial-gradient(1000px 500px at 100% 100%, rgba(244,63,94,0.06), transparent 60%)"
              : "none",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          },
          "::selection": {
            background: alpha("#a78bfa", 0.35),
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark
              ? "rgba(10,10,15,0.72)"
              : "rgba(255,255,255,0.72)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            boxShadow: "none",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            paddingInline: 20,
            paddingBlock: 10,
          },
          containedPrimary: {
            background: "linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)",
            boxShadow: "0 8px 24px -8px rgba(124,58,237,0.5)",
            "&:hover": {
              background: "linear-gradient(135deg,#6d28d9 0%,#8b5cf6 100%)",
              boxShadow: "0 12px 30px -8px rgba(124,58,237,0.65)",
            },
          },
          outlinedPrimary: {
            borderColor: "rgba(167,139,250,0.5)",
            "&:hover": {
              borderColor: "#a78bfa",
              background: "rgba(167,139,250,0.08)",
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark ? "#12121a" : "#ffffff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            overflow: "hidden",
            transition: "transform 0.35s cubic-bezier(.2,.9,.3,1), box-shadow 0.35s ease, border-color 0.35s ease",
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            fontWeight: 600,
            fontSize: "0.75rem",
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.02)",
            "& fieldset": {
              borderColor: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(167,139,250,0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a78bfa",
              borderWidth: "1.5px",
            },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "rgba(10,10,15,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.75rem",
          },
        },
      },
    },
  });
};