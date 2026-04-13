import { useEffect, useState } from "react";
import { getUsers } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import '../styles/LoginSignup.css'
import '../styles/all.css'

function LoginPage() {

    const [users, setUsers] = useState([]);

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

    const inscr = () => {
        navigate("/inscription");
    }

    return (
        <div class="formulaire">
        <h1>Connexion</h1>
            <form onClick={handleLogin}>
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)} required />
                <button type="submit">Valider</button>
            </form>
            <button onClick={inscr}>Pas de compte ? Inscrivez-vous ici</button>
            {error && <p>{error}</p>}
        </div>
    )
}



export default LoginPage;