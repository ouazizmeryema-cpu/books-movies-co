// const à supp quand connexion à la bdd faite 
const fakeFilms = [
    {
        id: 1,
        titre: "Inception",
        acteurs: "Di Caprio",
        realisateur: "yay",
        categorie: "Sci-Fi",
        note_moyenne: 4.5,
        commentaire: "ya",
        nb_votes: 12,
        annee_sortie: 2006
    },
    {
        id: 2,
        titre: "Interstellar",
        acteurs: "pas Di Caprio",
        realisateur: "yayy",
        categorie: "Sci-Fi",
        note_moyenne: 4.7,
        commentaire: "yaa",
        nb_votes: 13,
        annee_sortie: 2007
    }
];



export const getFilms = async () => {
    return new Promise((resolve) => { // quand back, remplacer par return axios.get("http://localhost:5000/films");
        setTimeout(() => {
        resolve({ data: fakeFilms });
        }, 500); 
    });
};


export const getFilmById = async (id) => {
    return new Promise((resolve) => { // quand back, remplacer par return axios.get("http://localhost:5000/films");
        setTimeout(() => {
        const film = fakeFilms.find(f => f.id === parseInt(id));
        resolve({ data: film });
        }, 300);
    });
};