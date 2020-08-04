var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BA2_bIUKNw6lbawjtJTnc-9CpYyuYoWd4z-sSRUoBTO7Yo1hWlJwlhdBqHiKa24g9xx_TVtwDJ8ZkBTSuvb7jcI",
    "privateKey": "HIThzHKPJzaBH35B6tXMiicW7sMuFWVY4ZlEzqppXo0"
};

webPush.setVapidDetails(
    'mailto:wastanami17@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
var pushSubcription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eQsDuGnjSlQ:APA91bHdoV4DMHIZjrwnYadz2q_rGVcSfq7jDTFtlyVeBPtknYDACsLMqOivbkMrIbXZCjrLOZzl12itWWm3v9li3YeHEyl3iSBFX6Btp9GKXGitGW38eVzzgOkw8mlU_BnPWmkexmOQ",
    "keys": {
        "p256dh": "BDI89pHvWCrpFb41wZ1EUew6Sjx7bq6R31eE7G4CPfvYlkeYp7YoZR2Wb+h/GQbiaaeMzWZGasvGmQ0dSX6VBKU=",
        "auth": "dnX8Hqvk85NReXMCiRKtLQ=="
    }
};

var payload = 'Selamat Datang di InBola';

var options = {
    gcmAPIKey: '85513270455',
    TTL: 60
};
webPush.sendNotification(
    pushSubcription,
    payload,
    options
);