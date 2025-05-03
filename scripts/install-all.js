// scripts/install-all.js
const { spawnSync } = require('child_process');
const services = require('./services');

for (const service of services) {
  console.log(`📦 Installation des dépendances pour ${service.name}...`);

  const result = spawnSync('npm', ['install'], {
    cwd: service.path,
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    console.error(`❌ Échec de l'installation pour ${service.name}`);
    process.exit(result.status);
  }

  console.log(`✅ ${service.name} prêt.`);
}
