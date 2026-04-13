
const db = require('../config/db');

const OMDB_URL = `http://www.omdbapi.com/`;

// GET /films — Récupère une liste de films depuis OMDB
exports.getALLFilms = async (req, res) => {
    const titres = ['Inception', 'Interstellar', 'The Dark Knight', 'Avatar', 'Titanic'];

    try {
        const films = await Promise.all(
            titres.map(async (titre) => {
                const response = await fetch(
                    `${OMDB_URL}?t=${titre}&apikey=${process.env.OMDB_API_KEY}&type=movie`
                );
                return response.json();
            })
        );
        res.json(films.filter(f => f.Response !== 'False'));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /films/:id — Un film par imdbID depuis OMDB
exports.getFilmByid = async (req, res) => {
    try {
        const response = await fetch(
            `${OMDB_URL}?i=${req.params.id}&apikey=${process.env.OMDB_API_KEY}`
        );
        const data = await response.json();
        if (data.Response === 'False') return res.status(404).json({ error: 'Film non trouvé' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /films/:id/noter — Noter un film (BDD)
exports.noterFilm = (req, res) => {
    // Récupération des champs envoyés dans le body
    const { utilisateurs_id, scenario, jeu_acteur, qualite_audiovisuelle } = req.body;

    // Récupération de l'id du film depuis l'URL
    const films_id = req.params.id;

    // Vérification que tous les champs sont présents
    if (!utilisateurs_id || !scenario || !jeu_acteur || !qualite_audiovisuelle) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Calcul de la note finale : moyenne arrondie des 3 critères
    const note_finale = Math.round((scenario + jeu_acteur + qualite_audiovisuelle) / 3);

    // Construction de l'objet note à insérer
    const note = { utilisateurs_id, films_id, scenario, jeu_acteur, qualite_audiovisuelle, note_finale };

    db.query('INSERT INTO notes_film SET ?', note, (err) => {
        if (err) {
            // Contrainte UNIQUE : l'utilisateur a déjà noté ce film
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Vous avez déjà noté ce film' });
            }
            // Autre erreur BDD
            return res.status(500).json({ error: err.message });
        }

        // Succès : retourne la note finale calculée
        res.status(201).json({ message: 'Note ajoutée', note_finale });
    });
};


// GET /films/:id/note?user_id=1 — Récupérer la note d'un utilisateur pour un film
exports.getNoteByFilmAndUser = (req, res) => {
    const { user_id } = req.query;
    const films_id = req.params.id;

    if (!user_id) return res.status(400).json({ error: 'user_id requis' });

    db.query(
        'SELECT * FROM notes_film WHERE films_id = ? AND utilisateurs_id = ?',
        [films_id, user_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ error: 'Note non trouvée' });
            res.json(results[0]);
        }
    );
};


// GET /films/:id/sync — Insère le film en BDD si pas présent et retourne son id BDD
exports.syncFilm = async (req, res) => {
    const imdbID = req.params.id;

    try {
        // Vérifier si le film existe déjà en BDD via imdbID stocké dans commentaire
        db.query('SELECT id FROM films WHERE commentaire LIKE ?', [`%[${imdbID}]%`], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            // Film déjà en BDD → retourne son id
            if (results.length > 0) {
                return res.json({ id: results[0].id });
            }

            // Film pas en BDD → fetch OMDB
            const response = await fetch(
                `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`
            );
            const data = await response.json();

            if (data.Response === 'False') {
                return res.status(404).json({ error: 'Film non trouvé sur OMDB' });
            }

            // Insertion en BDD
            const film = {
                titre:        data.Title,
                acteurs:      data.Actors,
                realisateur:  data.Director,
                categorie:    data.Genre,
                commentaire:  `${data.Plot} [${imdbID}]`,
                annee_sortie: parseInt(data.Year) || 2000
            };

            db.query('INSERT INTO films SET ?', film, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: result.insertId });
            });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET /films/db/:id — Un film par id BDD
exports.getFilmByDbId = (req, res) => {
    db.query('SELECT * FROM films WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Film non trouvé' });
        res.json(results[0]);
    });
};