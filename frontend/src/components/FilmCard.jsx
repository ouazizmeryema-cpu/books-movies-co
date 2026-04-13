// FilmCard.jsx
import { Link } from "react-router-dom";

function FilmCard({ film }) {
    return (
        <Link to={`/films/film/${film.imdbID}`}>
            <div>
                <img
                    src={film.Poster !== 'N/A' ? film.Poster : 'https://placehold.co/100x150?text=No+Image'}
                    alt={film.Title}
                    width="100"
                />
                <h3>{film.Title}</h3>
                <p>Année : {film.Year}</p>
                <p>Type : {film.Type}</p>
            </div>
        </Link>
    );
}

export default FilmCard;