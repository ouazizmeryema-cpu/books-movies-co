import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FilmsPage from "./pages/FilmsPage";
import FilmDetailPage from "./pages/FilmDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/connexion" />} />

            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<SignupPage />} />
            <Route path="/films" element={<FilmsPage />} />
            <Route path="/films/film/:id" element={<FilmDetailPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;