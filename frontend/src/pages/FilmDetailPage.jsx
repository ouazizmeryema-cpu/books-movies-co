import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmById } from "../services/filmsService";
import { getNoteById } from "../services/notesService";
import StarRating from "../components/StarRating";

function FilmDetailPage() {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [film, setFilm] = useState(null);
  const [note_film, setNoteFilm] = useState(null);

  useEffect(() => {
    getFilmById(id).then((res) => {
      setFilm(res.data);
    });
  }, [id]);

  useEffect(() => {
    getNoteById(user.id, id).then((res) => {
      setNoteFilm(res.data);
    });
  }, [id, user]);

  if (!film) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>{film.titre}</h1>
      <p>Acteurs : {film.acteurs}</p>
      <p>Réalisateur : {film.realisateur}</p>
      <p>Catégorie : {film.categorie}</p>
      <p>Note : {film.note_moyenne}</p>
      <p>Commentaire : {film.commentaire}</p>
      <p>Nombre de votes : {film.nb_votes}</p>
      <p>Année de sortie : {film.annee_sortie}</p>
      {!note_film && <StarRating film={film} />}
      {note_film && <p>Vous avez déjà noté ce film</p>}
    </div>
  );
}

export default FilmDetailPage;