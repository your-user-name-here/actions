// Helper to load assets (gifs, links, logos) from the data directory.
// This centralizes require() calls so the action script stays small and easier to test.
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function safeRequire(relPath, fallback) {
  try {
    // use require to allow bundlers/environments to resolve JSON
    return require(path.join(dataDir, relPath));
  } catch (e) {
    return fallback;
  }
}

function loadGifs() {
  return safeRequire('gifs.json', []);
}

function loadLinks() {
  return safeRequire('links.json', {});
}

function loadLogos() {
  return safeRequire('logos.json', {});
}

module.exports = {
  loadGifs,
  loadLinks,
  loadLogos
};
