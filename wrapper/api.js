const fetch = require('node-fetch');

module.exports.getUUID = async function(username) {
  const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
  return JSON.parse(await res.text())['id'];
}

module.exports.changeUsername = async function(password, { uuid, desiredUsername, token }) {
  return fetch(`https://api.mojang.com/user/profile/${uuid}/name`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: desiredUsername, password }),
  });
}