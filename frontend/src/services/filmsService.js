// const à supp quand connexion à la bdd faite 
const fakeFilms = [
  {
    id: 1,
    titre: "Inception",
    categorie: "Sci-Fi",
    note_moyenne: 4.5
  },
  {
    id: 2,
    titre: "Interstellar",
    categorie: "Sci-Fi",
    note_moyenne: 4.7
  }
];



export const getFilms = async () => {
  return new Promise((resolve) => { // quand back, remplacer par return axios.get("http://localhost:3000/films");
    setTimeout(() => {
      resolve({ data: fakeFilms });
    }, 500); 
  });
};


export const getFilmById = async (id) => {
  return new Promise((resolve) => { // quand back, remplacer par return axios.get("http://localhost:3000/films");
    setTimeout(() => {
      const film = fakeFilms.find(f => f.id === parseInt(id));
      resolve({ data: film });
    }, 300);
  });
};