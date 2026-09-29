import { Navigate, Route, Routes } from "react-router-dom";
import { useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

const Protected = ({ children }) => {
  const { user } = useApp();
  return user ? <><Navbar />{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  const { user } = useApp();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<Protected><Home /></Protected>} />
      <Route path="/movie/:id" element={<Protected><MovieDetails /></Protected>} />
      <Route path="/favorites" element={<Protected><Favorites /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
