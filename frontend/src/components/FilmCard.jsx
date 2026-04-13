import { Link } from "react-router-dom";
import '../styles/FilmCard.css'

function FilmCard({ film }) {
    return (
        <Link to={`/films/film/${film.id}`}>
        <div class="FilmCard">
            <h3>{film.titre}</h3>
            <p>Catégorie : {film.categorie}</p>
            <p>Note : {film.note_moyenne}</p>
        </div>
        </Link>
    );
}

export default FilmCard;