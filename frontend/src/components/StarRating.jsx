// StarRating.jsx
import { useState, useEffect } from "react";
import { getNoteById, createNote } from "../services/notesService";
import api from "../api.js";

function StarRating({ filmId, onNoteAdded }) {
    const token = localStorage.getItem("token");

    const getIdFromToken = () => {
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id || null;
        } catch {
            return null;
        }
    };

    const user_id = getIdFromToken();
    const film_id = filmId;

    const [note_film, setNoteFilm] = useState(null);
    const [scenario, setScenario] = useState(1);
    const [jeu_acteur, setJeuActeur] = useState(1);
    const [quali_audio, setQualiAudio] = useState(1);

    useEffect(() => {
        if (!user_id || !film_id) return;
        getNoteById(user_id, film_id)
            .then((res) => { setNoteFilm(res.data); })
            .catch(() => { setNoteFilm(null); });
    }, [film_id, user_id]);

    const notation = async (e) => {
        e.preventDefault();
        const newNote = {
            utilisateurs_id: user_id,
            films_id: film_id,
            scenario,
            jeu_acteur,
            qualite_audiovisuelle: quali_audio
        };
        const res = await createNote(film_id, newNote);
        setNoteFilm(res.data);

        // Met à jour la note moyenne dans FilmDetailPage
        const filmRes = await api.get(`/films/db/${film_id}`);
        onNoteAdded(filmRes.data.note_moyenne);
    };

    const formulaire = (
        <form onSubmit={notation}>
            <label>Scénario :
                <input type="number" value={scenario} min="1" max="5" step="1" onChange={(e) => setScenario(Number(e.target.value))} required />/5
            </label>
            <label>Jeu d'acteur :
                <input type="number" value={jeu_acteur} min="1" max="5" step="1" onChange={(e) => setJeuActeur(Number(e.target.value))} required />/5
            </label>
            <label>Qualité audiovisuel :
                <input type="number" value={quali_audio} min="1" max="5" step="1" onChange={(e) => setQualiAudio(Number(e.target.value))} required />/5
            </label>
            <button type="submit">Enregistrer ma note</button>
        </form>
    );

    return (
        <div>
            {!note_film && formulaire}
            {note_film && <p>Vous avez déjà noté ce film</p>}
        </div>
    );
}

export default StarRating;