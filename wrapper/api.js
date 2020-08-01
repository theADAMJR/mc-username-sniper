const fetch = require('node-fetch');

module.exports.changeUsername = async function(password, { bearerToken, uuid }, desiredUsername) {
  const res = await fetch(`https://api.mojang.com/user/profile/${uuid}/name`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: desiredUsername, password }),
  });
  try {
    return JSON.parse(await res.text());
  } catch { return null; }
}

module.exports.getUUID = async function(username) {
  const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  return JSON.parse(await res.text())['id'];
}

module.exports.getNameHistory = async function(uuid) {
  const res = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`);
  return JSON.parse(await res.text());
}