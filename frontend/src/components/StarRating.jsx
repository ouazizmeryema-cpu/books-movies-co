import { useState } from "react";
import { createNote } from "../services/notesService";

function StarRating({ film }) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const user_id = user.id;
    const film_id = film.id;

    const [scenario, setScenario] = useState(1);
    const [jeu_acteur, setJeuActeur] = useState(1);
    const [quali_audio, setQualiAudio] = useState(1);

    const notation = async (e) => {
        e.preventDefault();
        
        const newNote = {user_id, film_id, scenario, jeu_acteur, quali_audio};
        await createNote(newNote); 
                    
        location.reload();
    }

    return (
        <div>
            <form onSubmit={notation}>
                <label>Scénario :<input type="number" value={scenario} min="1" max="5" step="1" onChange={(e) => setScenario(e.target.value)} required />/5</label>
                <label>Jeu d'acteur :<input type="number" value={jeu_acteur} min="1" max="5" step="1" onChange={(e) => setJeuActeur(e.target.value)} required />/5</label>
                <label>Qualité audiovisuel :<input type="number" value={quali_audio} min="1" max="5" step="1" onChange={(e) => setQualiAudio(e.target.value)} required />/5</label>
                <button type="submit">Enregistrer ma note</button>
            </form>
        </div>
    );
}


export default StarRating;