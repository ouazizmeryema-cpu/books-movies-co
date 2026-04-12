// const à supp quand connexion à la bdd faite 
const fakeUsers = [
    {
        id: 1,
        nom: "Ascott",
        prenom: "Randall",
        ville: "Dorémont",
        adress: "",
        email: "ranran@gmail.com",
        mdp: "mdp"
    },
    {
        id: 2,
        nom: "Dumont",
        prenom: "Henri",
        ville: "Monte d'or",
        adress: "idk",
        email: "riri@gmail.com",
        mdp: "mdp"
    }
];


export const getUsers = async () => {
    return new Promise((resolve) => { // quand back, remplacer par return axios.get("http://localhost:5000/users");
        setTimeout(() => {
        resolve({ data: fakeUsers }); 
        }, 500); 
    });
};

export const getUserById = async (id) => {
    return new Promise((resolve) => { // quand back, remplacer par return axios.get("http://localhost:5000/users", id);
        setTimeout(() => {
        const user = fakeUsers.find(f => f.id === parseInt(id));
        resolve({ data: user });
        }, 300);
    });
};

export const createUser = async (newUser) => {
    return new Promise((resolve) => { // quand back, remplacer par return axios.post("http://localhost:5000/users", newUser);
        setTimeout(() => {
            const id = fakeUsers.length + 1;
            const userToAdd = { ...newUser, id };
            fakeUsers.push(userToAdd); 
            resolve({ data: userToAdd });
        }, 300);
    });
};