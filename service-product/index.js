const express = require('express');
const axios = require('axios');
const app = express();

// Produits fictifs
const products = [
  { id: 1, name: 'Lampe', supplierId: 42 },
  { id: 2, name: 'Chaise', supplierId: 1 },
  { id: 3, name: 'Table', supplierId: 2 },

];

// Middleware pour journaliser les requêtes
function logRequest(req, res, next) {
  console.log(`service-product pour : ${req.originalUrl}`);
  next();
}

// Route GET /products — liste tous les produits
app.get('/products', logRequest, (req, res) => {
  res.json(products);
}
);

// Route GET /products/:id — retourne un produit par ID
app.get('/products/:id', logRequest, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Not found');

  res.json(product);
}
);

// Route GET /products/:id/supplier — retourne le produit et son fournisseur
// Utilise axios pour faire une requête au service utilisateur
// Le service utilisateur écoute sur le port 3001
app.get('/products/:id/supplier', logRequest, async (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Not found');

  try {
    const response = await axios.get(`http://localhost:3001/supplier/${product.supplierId}`);
    res.json({ product, supplier: response.data });
  } catch (err) {
    res.status(500).send('Error contacting supplier service');
  }
});

app.listen(3002, () => console.log('📦 service-product listening on port 3002'));
