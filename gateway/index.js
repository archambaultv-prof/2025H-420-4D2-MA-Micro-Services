const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware pour journaliser les requêtes proxy
function logProxyRequest(req, res, next) {
    console.log(`Gateway pour : ${req.originalUrl}`);
    next();
}

//  Proxy pour le service utilisateur
//  Le service utilisateur écoute sur le port 3001
const supplierProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/': '/supplier/' }  // Par défaut, Express supprime le préfixe de l'URL dans app.use
  });
app.use('/supplier', logProxyRequest, supplierProxyMiddleware);

//  Proxy pour le service produit
//  Le service produit écoute sur le port 3002
const productProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: { '^/': '/products/' }  // Par défaut, Express supprime le préfixe de l'URL dans app.use
  });
app.use('/products', logProxyRequest, productProxyMiddleware);

// Sert le fichier HTML
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('🌐 gateway listening on port 3000'));
