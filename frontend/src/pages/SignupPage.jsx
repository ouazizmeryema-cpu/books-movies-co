import { useEffect, useState } from "react";
import { getUsers } from "../services/usersService";
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

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(u => u.email === email && u.mdp === mdp);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/films");
        } else {
            setError("Email ou mot de passe incorrect");
        }
    }

    const conn = () => {
        navigate("/connexion");
    }

    return (
        <div>
        <h1>Inscription</h1>
            <form>
                <input type="text" value={nom} placeholder="Nom" onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" value={prenom} placeholder="Prénom" onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" value={ville} placeholder="Ville (facultatif)" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={adress} placeholder="Adresse (facultatif)" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)} required />
                <button onClick={handleLogin}>Valider l'inscription</button>
                <button onClick={conn}>Déjà un compte ? Connectez-vous ici</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}



export default SignupPage;