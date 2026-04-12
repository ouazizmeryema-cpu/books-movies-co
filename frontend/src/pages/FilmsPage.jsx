import { useEffect, useState } from "react";
import { getFilms } from "../services/filmsService";
import FilmCard from "../components/FilmCard";
import { useNavigate } from "react-router-dom";

function FilmsPage() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log(user);

    useEffect(() => {

        if (!user) {
            navigate("/connexion");
        }
    }, [user]);

    const [films, setFilms] = useState([]);

    useEffect(() => {
        getFilms().then((res) => {
        setFilms(res.data);
        });
    }, []);

    return (
        <div>
            <button onClick={() => {localStorage.removeItem("user"); navigate("/connexion");}}>Déconnexion</button>
            <h1>Bienvenue {user?.prenom}</h1>

            {films.map((film) => (
                <FilmCard key={film.id} film={film} />
            ))}
        </div>
    );
}

export default FilmsPage;