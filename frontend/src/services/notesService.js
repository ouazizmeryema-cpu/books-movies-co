// // const Ã  supp quand connexion Ã  la bdd faite 
// const fakeNotes = [
//     {
//         id: 1,
//         utilisateurs_id: 1,
//         films_id: 2,
//         scenario: 4,
//         jeu_acteur: 3,
//         qualite_audiovisuelle: 3,
//         note_finale: 3.3
//     },
//     {
//         id: 2,
//         utilisateurs_id: 2,
//         films_id: 1,
//         scenario: 5,
//         jeu_acteur: 2,
//         qualite_audiovisuelle: 4,
//         note_finale: 3.7
//     }
// ];


// export const getNoteById = async (user_id, film_id) => {
//     return new Promise((resolve) => { // quand back, remplacer par return axios.get("http://localhost:5000/films/:id/note");
//         setTimeout(() => {
//         const note = fakeNotes.find(n => n.utilisateurs_id === parseInt(user_id) && n.films_id === parseInt(film_id));
//         resolve({ data: note }); 
//         }, 500); 
//     });
// };

// export const createNote = async (newNote) => {
//     return new Promise((resolve) => { // quand back, remplacer par return axios.post("http://localhost:5000//films/:id/noter", newNote);
//         setTimeout(() => {
//             const id = fakeNotes.length + 1;
//             const userToAdd = { ...newNote, id };
//             fakeNotes.push(userToAdd); 
//             resolve({ data: userToAdd });
//         }, 300);
//     });
// };

// notesService.js
import api from "../api.js";

export const getNoteById = async (user_id, film_id) => {
    return api.get(`/films/${film_id}/note`, { params: { user_id } });
};

export const createNote = async (film_id, newNote) => {
    return api.post(`/films/${film_id}/noter`, newNote);
};