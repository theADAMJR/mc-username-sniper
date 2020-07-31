const fetch = require('node-fetch');

module.exports.authenticate = async function({ email, username, password, migrated }) {
  const res = await fetch(`https://authserver.mojang.com/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent: { name: "Minecraft", version: 1 },
      username: (migrated) ? email : username,
      password
    }),
  });
  return JSON.parse(await res.text());
}