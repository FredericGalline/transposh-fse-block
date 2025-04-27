/**
 * Script pour compiler tous les blocs personnalisés
 */
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Chemin vers le dossier des blocs
const blocksDir = path.join(__dirname, "..", "blocks");

// Récupère tous les dossiers de blocs
const blockFolders = fs
  .readdirSync(blocksDir)
  .filter((file) => fs.statSync(path.join(blocksDir, file)).isDirectory());

// Compile chaque bloc
async function buildBlocks() {
  console.log("🧱 Compilation de tous les blocs");

  for (const blockFolder of blockFolders) {
    const blockPath = path.join(blocksDir, blockFolder);

    // Vérifie si le dossier contient un package.json
    if (!fs.existsSync(path.join(blockPath, "package.json"))) {
      console.log(`⏭️ ${blockFolder}: Pas de package.json trouvé, ignore...`);
      continue;
    }

    console.log(`🔨 Compilation du bloc: ${blockFolder}`);

    try {
      // Exécute la commande wp-scripts build dans le dossier du bloc
      await runCommand("npx", ["wp-scripts", "build"], {
        cwd: blockPath,
        stdio: "inherit",
      });
      console.log(`✅ ${blockFolder}: Compilation réussie`);
    } catch (error) {
      console.error(`❌ ${blockFolder}: Erreur de compilation:`, error);
    }
  }
}

// Exécute une commande dans un processus enfant
function runCommand(command, args, options) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, options);

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`La commande s'est terminée avec le code: ${code}`));
      }
    });

    process.on("error", (err) => {
      reject(err);
    });
  });
}

// Lance la compilation
buildBlocks().catch((err) => {
  console.error("Erreur globale:", err);
  process.exit(1);
});
