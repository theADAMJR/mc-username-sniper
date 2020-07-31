const fetch = require('node-fetch');

module.exports.authenticate = async function({ email, username, password, migrated }) {
  const res = await fetch(`https://authserver.mojang.com/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: (migrated) ? email : username,
      password,
      requestUser: true
    }),
  });
  return JSON.parse(await res.text());
}