// const à supp quand connexion à la bdd faite 
const fakeNotes = [
    {
        id: 1,
        utilisateurs_id: 1,
        films_id: 2,
        scenario: 4,
        jeu_acteur: 3,
        qualite_audiovisuelle: 3,
        note_finale: 3.3
    },
    {
        id: 2,
        utilisateurs_id: 2,
        films_id: 1,
        scenario: 5,
        jeu_acteur: 2,
        qualite_audiovisuelle: 4,
        note_finale: 3.7
    }
];


export const createNote = async (newNote) => {
    return new Promise((resolve) => { // quand back, remplacer par return axios.post("http://localhost:5000//films/:id/noter", newNote);
        setTimeout(() => {
            const id = fakeNotes.length + 1;
            const userToAdd = { ...newNote, id };
            fakeNotes.push(userToAdd); 
            resolve({ data: userToAdd });
        }, 300);
    });
};