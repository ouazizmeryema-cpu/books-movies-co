import { useEffect, useState } from "react";
import { getUsers, getUserById } from "../services/usersService";
import { useNavigate } from "react-router-dom";

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
            navigate("/films");
        } else {
            setError("Email ou mot de passe incorrect");
        }
    }

    return (
        <div>
        <h1>Connexion</h1>
            <form>
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)} />
                <button onClick={handleLogin}>Connexion</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}



export default LoginPage;