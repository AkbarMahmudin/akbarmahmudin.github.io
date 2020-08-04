let dbPromised = idb.open('info-bola', 5, function (upgradeDb) {
    let teamsObjectStore = upgradeDb.createObjectStore('teams', {
        keyPath: 'id'
    });
    teamsObjectStore.createIndex('name', 'name', {unique: false});
});

function favoriteTeam(team) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            store.put(team);
            return tx.complete;
        })
        .then(function () {
            M.toast({html: `${team.name} berhasil ditambahkan ke dalam daftar favoritmu.`});
        });
}

function deleteTeam(team) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            
            store.delete(parseInt(team.id));
            goBack();
            return tx.complete;
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction('teams', 'readonly');
                let store = tx.objectStore('teams');
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            })
    })
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction('teams', 'readonly');
                let store = tx.objectStore('teams');
                return store.get(parseInt(id));
            })
            .then(function (team) {
                resolve(team);
            });
    });
}