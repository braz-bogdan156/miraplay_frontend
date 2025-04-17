import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/global.css'
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import GamesPage from "./pages/GamesPage/GamesPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/games" element={<GamesPage />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;