import { useState } from "react";
import { createUser } from "../services/usersService";  // supprimer getUsers
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [ville, setVille] = useState("");
    const [adress, setAdress] = useState("");
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUser({ nom, prenom, ville, adress, email, mdp });
            navigate("/connexion");
        } catch (err) {
            if (err.response?.status === 409) {
                setError("Cet email est déjà utilisé");
            } else {
                setError("Erreur lors de l'inscription");
            }
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSignup}>
                <input type="text" value={nom} placeholder="Nom" onChange={(e) => setNom(e.target.value)} required />
                <input type="text" value={prenom} placeholder="Prénom" onChange={(e) => setPrenom(e.target.value)} required />
                <input type="text" value={ville} placeholder="Ville (facultatif)" onChange={(e) => setVille(e.target.value)} />
                <input type="text" value={adress} placeholder="Adresse (facultatif)" onChange={(e) => setAdress(e.target.value)} />
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)} required />
                <button type="submit">Valider l'inscription</button>
            </form>
            <button onClick={() => navigate("/connexion")}>Déjà un compte ? Connectez-vous ici</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignupPage;