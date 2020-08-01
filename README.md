# Minecraft Username Sniper
Snipe usernames very fast.

`user.json`:
```json
{
  "account": {
    "bearerToken": "minecraft.net bearer token",
    "email": "your minecraft user email",
    "password": "your minecraft user password",
    "migrated": true
  },
  "target": {
    "username": "the username you want",
    "uuid": "uuid of last player with username"
  }
}
```

## Errors
`Invalid name change: profileId = b57394efaee14e20b9b269b41c95e1b7, new name = Detected.`
Name was unavailable or could not be changed at that time. This also means the bearerToken is valid

`The request requires user authentication`
Bearer token was invalid.

1) Login to https://minecraft.net
2) Type in this code to get `bearer_token`
```js
cookie = (key) => (new RegExp(key+'=(.*?); ','gm')).exec(document.cookie+'; ')[1]
cookie('bearer_token');
```
3) Paste it in `user.json`