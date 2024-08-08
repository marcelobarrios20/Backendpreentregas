const fs = require('fs').promises;

async function readFile(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return []; 
    throw error;
  }
}

async function writeFile(path, data) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}

module.exports = { readFile, writeFile };
