import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilmsPage from "./pages/FilmsPage";
import FilmDetailPage from "./pages/FilmDetailPage";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<FilmsPage />} />
            <Route path="/film/:id" element={<FilmDetailPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;