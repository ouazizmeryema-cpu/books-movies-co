import { useState, useEffect } from "react";
import { getNoteById, createNote } from "../services/notesService";

function StarRating({ film }) {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const user_id = user?.id;
    const film_id = film.id;

    const [note_film, setNoteFilm] = useState(null);

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
        await createNote(newNote); 
        setNoteFilm(res.data);
    }

    const formulaire = (
        <form onSubmit={notation}>
            <label>Scénario :<input type="number" value={scenario} min="1" max="5" step="1" onChange={(e) => setScenario(Number(e.target.value))} required />/5</label>
            <label>Jeu d'acteur :<input type="number" value={jeu_acteur} min="1" max="5" step="1" onChange={(e) => setJeuActeur(Number(e.target.value))} required />/5</label>
            <label>Qualité audiovisuel :<input type="number" value={quali_audio} min="1" max="5" step="1" onChange={(e) => setQualiAudio(Number(e.target.value))} required />/5</label>
            <button type="submit">Enregistrer ma note</button>
        </form>
    )


    useEffect(() => {
        getNoteById(user.id, film_id).then((res) => {
        setNoteFilm(res.data);
        });
    }, [film_id, user]);

    return (
        <div>
            {!note_film && formulaire}
            {note_film && <p>Vous avez déjà noté ce film</p>}
        </div>
    );
}


export default StarRating;