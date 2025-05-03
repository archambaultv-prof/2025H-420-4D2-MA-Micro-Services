// scripts/stop-all.js
const fs = require('fs');
const services = require('./services');

if (!fs.existsSync('.service-pids.json')) {
  console.error('❌ Aucun fichier .service-pids.json trouvé.');
  process.exit(1);
}

const pids = JSON.parse(fs.readFileSync('.service-pids.json', 'utf-8'));

for (const { name } of services) {
  const pid = pids[name];
  if (!pid) continue;

  try {
    process.kill(pid);
    console.log(`🛑 ${name} (PID ${pid}) arrêté.`);
  } catch (err) {
    console.error(`⚠️ Impossible d’arrêter ${name} : ${err.message}`);
  }
}

fs.unlinkSync('.service-pids.json');
