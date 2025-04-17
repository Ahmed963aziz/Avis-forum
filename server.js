const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Sert le fichier HTML depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// 👉 Connexion à MongoDB
mongoose.connect('mongodb+srv://Aziz123:Ahmed-Aziz292@cluster.mongodb.net/avisDB')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error(err));

// 👉 Schéma des avis
const AvisSchema = new mongoose.Schema({
  phase: String,
  tache: String,
  defaillance: String,
  gravite: Number,
  occurence: Number,
  detectabilite: Number,
  rpn: Number
});

const Avis = mongoose.model('Avis', AvisSchema);

// 👉 Route pour ajouter un avis
app.post('/ajouter-avis', async (req, res) => {
  try {
    const avis = new Avis(req.body);
    await avis.save();
    res.status(201).json({ message: 'Avis enregistré' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur actif sur http://localhost:${PORT}`));
