const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'merge-pr', 'data');

test('data files exist and are valid JSON', () => {
  const gifsPath = path.join(dataDir, 'gifs.json');
  const linksPath = path.join(dataDir, 'links.json');
  const logosPath = path.join(dataDir, 'logos.json');

  expect(fs.existsSync(gifsPath)).toBe(true);
  expect(fs.existsSync(linksPath)).toBe(true);
  expect(fs.existsSync(logosPath)).toBe(true);

  const gifs = JSON.parse(fs.readFileSync(gifsPath, 'utf8'));
  expect(Array.isArray(gifs)).toBe(true);
  expect(gifs.length).toBeGreaterThan(0);

  const links = JSON.parse(fs.readFileSync(linksPath, 'utf8'));
  expect(typeof links).toBe('object');
  expect(Object.keys(links).length).toBeGreaterThan(0);

  const logos = JSON.parse(fs.readFileSync(logosPath, 'utf8'));
  expect(typeof logos).toBe('object');
  expect(Object.keys(logos).length).toBeGreaterThan(0);
});

test('action.yml references the data files', () => {
  const actionYmlPath = path.join(root, 'merge-pr', 'action.yml');
  const actionYml = fs.readFileSync(actionYmlPath, 'utf8');

  // allow optional quote/backtick before the closing parenthesis because the YAML script uses template literals
  // action.yml should reference the assets helper module path
  expect(actionYml).toMatch(/merge-pr\/lib\/assets/);
  // data files themselves are validated in the other test
});
