import { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/usersService";
import { useNavigate } from "react-router-dom";

function SignupPage() {

    const [users, setUsers] = useState([]);

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [ville, setVille] = useState("");
    const [adress, setAdress] = useState("");
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then((res) => {
        setUsers(res.data);
        });
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        const user = users.find(u => u.email === email);

        if (user) {
            setError("Cet utilisateur existe déjà");
            return;
        } else {
            const newUser = {nom, prenom, ville, adress, email, mdp};
            await createUser(newUser); 
            
            navigate("/connexion");
        }
    }

    const conn = () => {
        navigate("/connexion");
    }

    return (
        <div>
        <h1>Inscription</h1>
            <form onSubmit={handleSignup}>
                <input type="text" value={nom} placeholder="Nom" onChange={(e) => setNom(e.target.value)} required />
                <input type="text" value={prenom} placeholder="Prénom" onChange={(e) => setPrenom(e.target.value)} required />
                <input type="text" value={ville} placeholder="Ville (facultatif)" onChange={(e) => setVille(e.target.value)} />
                <input type="text" value={adress} placeholder="Adresse (facultatif)" onChange={(e) => setAdress(e.target.value)} />
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)} required />
                <button type="submit">Valider l'inscription</button>
            </form>
            <button onClick={conn}>Déjà un compte ? Connectez-vous ici</button>
            {error && <p>{error}</p>}
        </div>
    )
}



export default SignupPage;