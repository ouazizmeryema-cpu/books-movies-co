// FilmsPage.jsx
import { useEffect, useState } from "react";
import { getFilms } from "../services/filmsService";
import FilmCard from "../components/FilmCard";
import { useNavigate } from "react-router-dom";

function FilmsPage() {
    const navigate = useNavigate();
    const [films, setFilms] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) navigate("/connexion");
    }, [token]);

    useEffect(() => {
        getFilms('marvel').then((res) => {
            setFilms(res.data);
        });
    }, []);

    return (
        <div>
            <button onClick={() => { localStorage.removeItem("token"); navigate("/connexion"); }}>
                Déconnexion
            </button>
            <h1>Films</h1>
            {films.map((film) => (
                <FilmCard key={film.imdbID} film={film} />  
            ))}
        </div>
    );
}

export default FilmsPage;