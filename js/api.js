const BASE_URL = 'https://api.football-data.org/v2/';
const fetchAPI = function (url) {
    return fetch(url, {
        headers: {
            'X-AUTH-TOKEN': 'eef894bcea28438f8e5145e31c9b38ff'
        }
    });
};

function status(response) {
    if (response.status !== 200) {
        console.log(`Error: ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log(`Error: ${error}`);
}

function getMatchToday() {
    if ('caches' in window) {
        caches.match(BASE_URL + 'matches').then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    matchContent(data);
                })
            }
        });
    }
    
    fetchAPI(BASE_URL + 'matches')
    .then(status)
    .then(json)
    .then(function (data) {
        if (data.count == 0) {
            document.querySelector('#matches').innerHTML = `
            <h3 class="center grey-text" style="margin: 10%">Tidak ada pertandingan hari ini</h3>`;
        } else {
            matchContent(data);
        }
    })
    .catch(error);
}

function getCompetition(keyword) {
    if ('caches' in window) {
        caches.match(BASE_URL + 'competitions/' + keyword + '/' + 'teams').then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    data = data.teams;
                    contentHTML = '';
                    for (const i in data) {
                        let teams = data[i];
                        allTeamContent(teams);
                    }
                    document.querySelector('#teams').innerHTML = contentHTML;
                })
            }
        });
    }
    
    fetchAPI(BASE_URL + 'competitions/' + keyword + '/' + 'teams')
    .then(status)
    .then(json)
    .then(function (data) {
        data = data.teams;
        contentHTML = '';
        for (const i in data) {
            let teams = data[i];
            let favorited = false;
            allTeamContent(teams, favorited);
        }
        document.querySelector('#teams').innerHTML = contentHTML;
    })
    .catch(error);
}

function getTeamById() {
    return new Promise(function (resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get('id');

        if ('caches' in window) {
            caches.match(BASE_URL + 'teams/' + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        teamContent(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(BASE_URL + 'teams/' + idParam)
        .then(status)
        .then(json)
        .then(function (data) {
            teamContent(data);
            resolve(data);
        })
        .catch(error);

    });
}

function getFavoriteTeams() {
    getAll().then(function (teams) {

        contentHTML = '';
        teams.forEach(function (team) {
            let favorited = true;
            allTeamContent(team, favorited);
        });
        
        if (Object.keys(teams).length !== 0) {
            document.querySelector('#teams').innerHTML = contentHTML;
        } else {
            document.querySelector('#teams').innerHTML = `<h3 class="center grey-text" style="margin: 10%">Ups, belum ada team favoritmu</h3>`;
        }
    });
}

function getFavoriteTeamById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get('id');

    getById(idParam).then(function (team) {
        teamContent(team);
    });
}

