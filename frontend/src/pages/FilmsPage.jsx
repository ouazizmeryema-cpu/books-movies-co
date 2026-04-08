import { useEffect, useState } from "react";
import { getFilms } from "../services/filmsService";
import FilmCard from "../components/FilmCard";

function FilmsPage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getFilms().then((res) => {
      setFilms(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Liste des films</h1>

      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}

export default FilmsPage;