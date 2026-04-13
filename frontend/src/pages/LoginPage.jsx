// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/utilisateurs/login', { email, mdp });
            localStorage.setItem("token", res.data.token);
            navigate("/films");
        } catch (err) {
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="auth-page">
            <h1>Connexion</h1>
            <form onSubmit={handleLogin}>
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)} required />
                <button type="submit">Valider</button>
                <button type="button" onClick={() => navigate("/inscription")}>Pas de compte ? Inscrivez-vous ici</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default LoginPage;