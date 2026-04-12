import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilmById } from "../services/filmsService";
import StarRating from "../components/StarRating";

function FilmDetailPage() {
  const { id } = useParams();

  const [film, setFilm] = useState(null);

  useEffect(() => {
    getFilmById(id).then((res) => {
      setFilm(res.data);
    });
  }, [id]);

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
      {<StarRating film={film} />}
    </div>
  );
}

export default FilmDetailPage;