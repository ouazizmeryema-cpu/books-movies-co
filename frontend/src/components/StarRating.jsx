import { useState, useEffect } from "react";
import { getNoteById, createNote } from "../services/notesService";

function StarRating({ film }) {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const user_id = user?.id;
    const film_id = film.id;

    const [note_film, setNoteFilm] = useState(null);
    const [loading, setLoading] = useState(true);

    const [scenario, setScenario] = useState(1);
    const [jeu_acteur, setJeuActeur] = useState(1);
    const [quali_audio, setQualiAudio] = useState(1);

    const notation = async (e) => {
        e.preventDefault();
        
        const newNote = {
            utilisateurs_id: user_id,
            films_id: film_id,
            scenario,
            jeu_acteur,
            qualite_audiovisuelle: quali_audio
        };
        const res = await createNote(newNote); 
        setNoteFilm(res.data);
    }

    const formulaire = (
        <form onSubmit={notation}  class="form_rating">
            <label>Scénario :<input class="input_rating" type="number" value={scenario} min="1" max="5" step="1" onChange={(e) => setScenario(Number(e.target.value))} required />/5</label>
            <label>Jeu d'acteur :<input class="input_rating" type="number" value={jeu_acteur} min="1" max="5" step="1" onChange={(e) => setJeuActeur(Number(e.target.value))} required />/5</label>
            <label>Qualité audiovisuel :<input class="input_rating" type="number" value={quali_audio} min="1" max="5" step="1" onChange={(e) => setQualiAudio(Number(e.target.value))} required />/5</label>
            <button type="submit">Enregistrer ma note</button>
        </form>
    )


    useEffect(() => {
        setLoading(true);

        getNoteById(user.id, film_id)
            .then((res) => {
                setNoteFilm(res.data);
            })
            .catch(() => {
                setNoteFilm(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [film_id, user]);


    return (
        <div>
            {loading && <p>Chargement...</p>}
            {!loading && note_film && (<p>Vous avez déjà noté ce film</p>)}
            {!loading && !note_film && formulaire}
        </div>
    );
}


export default StarRating;