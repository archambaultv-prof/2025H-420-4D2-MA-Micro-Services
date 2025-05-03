const express = require('express');
const app = express();

// Simulons une "base de données" de fournisseurs
const suppliers = [
  { id: 1, name: 'Alice Dupont', email: 'alice@example.com' },
  { id: 2, name: 'Bob Tremblay', email: 'bob@example.com' },
  { id: 42, name: 'Eugène le Propriétaire', email: 'eugene@proprio.com' }
];

// Middleware pour journaliser les requêtes
function logRequest(req, res, next) {
  console.log(`service-supplier pour : ${req.originalUrl}`);
  next();
}

// Route GET /supplier — liste tous les fournisseurs
app.get('/supplier', logRequest, (req, res) => {
  res.json(suppliers);
});

// Route GET /supplier/:id — retourne un fournisseur par ID
app.get('/supplier/:id', logRequest, (req, res) => {
  const supplierId = parseInt(req.params.id);
  const supplier = suppliers.find(u => u.id === supplierId);
  
  if (!supplier) {
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  }

  res.json(supplier);
});

// Démarrage du service
app.listen(3001, () => {
  console.log('👤 service-supplier en écoute sur le port 3001');
});
