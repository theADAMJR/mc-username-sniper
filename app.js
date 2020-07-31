const api = require('./wrapper/api');
const auth = require('./wrapper/auth')
const { account, desiredUsername } = require('./user.json');

(async() => {
  const { accessToken, selectedProfile } = await auth.authenticate(account);
  if (!accessToken)
    return console.log(`RESULT: Invalid username or password.`);
  
  await changeUsername(account.bearerToken, selectedProfile);
})();

async function changeUsername(bearerToken, profile) {    
  const divider = '------------------------------';
  console.log(`CHANGING USERNAME\n` +
    `Old: ${profile.name}\n` +
    `New: ${desiredUsername}\n` +
    divider);

  console.time('changeUsername');

  const attempt = await api.changeUsername(account.password, {
    bearerToken,
    desiredUsername,
    uuid: profile.id
  });

  console.timeEnd('changeUsername');
  // 

  if (attempt.error) {
    console.log(`ERROR: ${attempt.errorMessage}.`);
    console.log(`RESULT: Mission Failed. We'll get em next time.`);
  }
}