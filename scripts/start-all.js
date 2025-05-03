// scripts/start-all.js
const { spawn } = require('child_process');
const fs = require('fs');
const services = require('./services');

const pids = {};

for (const service of services) {
  const proc = spawn('npm', ['start'], {
    cwd: service.path,
    stdio: 'inherit',
    shell: true,
  });

  pids[service.name] = proc.pid;
  console.log(`✅ ${service.name} démarré avec PID ${proc.pid}`);
}

// Sauvegarde des PID pour pouvoir arrêter plus tard
fs.writeFileSync('.service-pids.json', JSON.stringify(pids, null, 2));
