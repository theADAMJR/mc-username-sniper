const api = require('./wrapper/api');
const auth = require('./wrapper/auth')
const user = require('./user.json');

(async() => {
  const uuid = await api.getUUID(user.username);
  console.log(`${user.username} UUID: ${uuid}`);

  const bearerToken = await auth.authenticate(user);
  console.log(bearerToken);
})();