// FilmDetailPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmById, syncFilm } from "../services/filmsService";
import StarRating from "../components/StarRating";
import api from "../api.js";

function FilmDetailPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [filmDbId, setFilmDbId] = useState(null);
  const [noteMoyenne, setNoteMoyenne] = useState(null);

  useEffect(() => {
    getFilmById(id).then((res) => {
      setFilm(res.data);
    });

    syncFilm(id).then((res) => {
      const dbId = res.data.id;
      setFilmDbId(dbId);

      api.get(`/films/db/${dbId}`).then((r) => {
        setNoteMoyenne(r.data.note_moyenne);
      }).catch(() => {
        setNoteMoyenne(0);
      });
    });
  }, [id]);

  if (!film) return <p>Chargement...</p>;

  return (
    <div>
      <img
        src={film.Poster !== 'N/A' ? film.Poster : 'https://placehold.co/100x150?text=No+Image'}
        alt={film.Title}
        width="200"
      />
      <h1>{film.Title}</h1>
      <p>Acteurs : {film.Actors}</p>
      <p>Réalisateur : {film.Director}</p>
      <p>Catégorie : {film.Genre}</p>
      <p>Note moyenne utilisateurs : {noteMoyenne > 0 ? noteMoyenne : 'Aucune note pour le moment'}</p>
      <p>Commentaire : {film.Plot}</p>
      <p>Année de sortie : {film.Year}</p>
      {filmDbId && <StarRating filmId={filmDbId} onNoteAdded={(moyenne) => setNoteMoyenne(moyenne)} />}
    </div>
  );
}

export default FilmDetailPage;