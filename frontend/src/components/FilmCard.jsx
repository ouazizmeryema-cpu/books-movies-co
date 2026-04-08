import { Link } from "react-router-dom";

function FilmCard({ film }) {
    return (
        <Link to={`/film/${film.id}`}>
        <div>
            <h3>{film.titre}</h3>
            <p>Catégorie : {film.categorie}</p>
            <p>Note : {film.note_moyenne}</p>
        </div>
        </Link>
    );
}

export default FilmCard;