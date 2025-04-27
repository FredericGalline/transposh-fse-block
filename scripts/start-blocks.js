/**
 * Script pour démarrer le mode développement (watch) pour tous les blocs
 */
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Chemin vers le dossier des blocs
const blocksDir = path.join(__dirname, "..", "blocks");

// Vérifie si un argument de bloc spécifique a été fourni
const specificBlock = process.argv[2];

// Récupère tous les dossiers de blocs ou le bloc spécifique si fourni
let blockFolders;
if (specificBlock) {
  // Vérifie si le bloc spécifique existe
  if (fs.existsSync(path.join(blocksDir, specificBlock))) {
    blockFolders = [specificBlock];
  } else {
    console.error(
      `❌ Le bloc "${specificBlock}" n'existe pas dans le dossier blocks/`
    );
    process.exit(1);
  }
} else {
  blockFolders = fs
    .readdirSync(blocksDir)
    .filter((file) => fs.statSync(path.join(blocksDir, file)).isDirectory());
}

// Démarre le mode développement pour un bloc
function startDevForBlock(blockFolder) {
  const blockPath = path.join(blocksDir, blockFolder);

  // Vérifie si le dossier contient un package.json
  if (!fs.existsSync(path.join(blockPath, "package.json"))) {
    console.log(`⏭️ ${blockFolder}: Pas de package.json trouvé, ignore...`);
    return;
  }

  console.log(`🔄 Démarrage du mode développement pour: ${blockFolder}`);

  // Exécute la commande wp-scripts start dans le dossier du bloc
  const process = spawn("npx", ["wp-scripts", "start"], {
    cwd: blockPath,
    stdio: "inherit",
    shell: true,
  });

  process.on("error", (error) => {
    console.error(`❌ ${blockFolder}: Erreur:`, error);
  });

  return process;
}

// Informe l'utilisateur sur l'utilisation
if (blockFolders.length > 1) {
  console.log("ℹ️  Démarrage du mode développement pour tous les blocs");
  console.log(
    "ℹ️  Pour démarrer un bloc spécifique: npm run start:blocks [nom-du-bloc]"
  );
  console.log("ℹ️  Les blocs disponibles sont:", blockFolders.join(", "));
  console.log("ℹ️  Appuyez sur Ctrl+C pour arrêter tous les processus\n");
}

// Démarre le mode développement pour chaque bloc (ou le bloc spécifique)
const processes = blockFolders.map(startDevForBlock).filter(Boolean);

// Gestion de l'arrêt propre des processus
process.on("SIGINT", () => {
  console.log("\n🛑 Arrêt de tous les processus...");
  processes.forEach((proc) => {
    if (proc) {
      proc.kill("SIGINT");
    }
  });
  process.exit(0);
});
