function FilmCard({ film }) {
  return (
    <div>
      <h3>{film.titre}</h3>
      <p>Catégorie : {film.categorie}</p>
      <p>Note : {film.note_moyenne}</p>
    </div>
  );
}

export default FilmCard;