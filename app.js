const api = require('./wrapper/api');
const auth = require('./wrapper/auth')
const { account, targets } = require('./user.json');

const sleep = require('util').promisify(setTimeout);

const divider = '------------------------------';

(async() => {
  const { accessToken, selectedProfile } = await auth.authenticate(account);
  if (!accessToken)
    return console.log(`RESULT: Invalid username or password.`);
  
    console.log('---- INITIAL TEST ATTEMPT ----');
    await changeUsername(account.bearerToken, selectedProfile, targets[0]);

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];

    let availableMs = +target.nextAvailableTimestamp;
    const timeLeftMs = () => availableMs - new Date();
  
    console.log(`${divider}\n${target.username} is available at ${new Date(availableMs)}`);
    
    const offsetMs = 35;
    await setSecReminder(timeLeftMs, offsetMs, target);
  
    await sleep(timeLeftMs() - offsetMs);
    await changeUsername(account.bearerToken, selectedProfile, target);
    await changeUsername(account.bearerToken, selectedProfile, target);    
  }
})();

async function setSecReminder(timeLeftMs, offsetMs, target) {
  await sleep(timeLeftMs() - offsetMs - (60 * 1000));
  const secReminder = setInterval(() => {
    console.log(`Attempting to get ${target.username} in ${timeLeftMs() / 1000}s`);
    if (timeLeftMs() / 1000 <= 10)
      clearInterval(secReminder);
  }, 5 * 1000);
}

async function changeUsername(bearerToken, profile, target) {
  console.time('changeUsername');

  const attempt = await api.changeUsername(account.password,
    { bearerToken, uuid: profile.id }, target.username);

  console.timeEnd('changeUsername');
  
  console.log(`${divider}\n` +
    `CHANGING USERNAME\n` +
    `Old: ${profile.name}\n` +
    `New: ${target.username}\n` +
    divider);

  if (attempt.error)
    console.log(`ERROR: ${attempt.errorMessage}.\n` +
      `RESULT: Mission Failed. We'll get em next time!`);
  if (attempt.errorMessage && attempt.errorMessage.includes('Invalid name change'))
    console.log(`Bearer Token is Valid.`);  
  else if (!attempt.error)
    console.log(`RESULT: Mission Success. We'll get em this time!`);
  
  console.log(`At: ${new Date()}`);
}

async function nextAvailableMs() {
  return +target.nextAvailableTimestamp;
}