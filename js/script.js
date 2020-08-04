// Service Worker
if (!('serviceWorker' in navigator)) {
    console.log('Service worker tidak didukung di browser ini');
} else {
    registerServiceWorker();
    requestPermission();
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
            console.log('Registrasi service worker berhasil');
            return registration;
        })
        .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
        });
}

// Push Notification
function requestPermission() {
    Notification.requestPermission().then(function (result) {
        if (result === 'denied') {
            console.log('Fitur Notifikasi tidak diizinkan');
            return;
        }else if (result == 'default') {
            console.error('Pengguna menutup kotak dialog permintaan izin');
            return;
        }

        console.log('Fitur notifikasi diizinkan');
    });
}

if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function (registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BA2_bIUKNw6lbawjtJTnc-9CpYyuYoWd4z-sSRUoBTO7Yo1hWlJwlhdBqHiKa24g9xx_TVtwDJ8ZkBTSuvb7jcI')
        }).then(function (subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key:', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh'))
            )));
            console.log('Berhasil melakukan subscribe dengan auth key:', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth'))
            )));
        }).catch(function (e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Element & Content Fungsi
function select() {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
}

function filter() {
    const select = document.querySelector('#select-element');
    getCompetition(select.value);
}

function goBack() {
    window.history.back();
}

function matchContent(data) {
    data = data.matches;
    let matchHTML = '';
    for (let i in data) {
        let homeTeam = data[i].homeTeam;
        let awayTeam = data[i].awayTeam;
        let competition = data[i].competition;
        let date = data[i].utcDate;
        matchHTML += `
        <div class="card-panel">
            <h6 class="green-text text-darken-4"><b>${competition.name}</b></h6>
            <div class="row">
                <div class="col m4 s12">
                    <h5>${homeTeam.name}</h5>
                </div>
                <div class="col m4 s12">
                    <h5>VS</h5>
                </div>
                <div class="col m4 s12">
                    <h5>${awayTeam.name}</h5>
                </div>
            </div>
            <h6 class="green-text text-darken-4"><b>${date.substr(11, 8)}</b></h6>
        </div>`;
    }
    document.querySelector('#matches').innerHTML = matchHTML;
}

function allTeamContent(data, favorited) {
    contentHTML += `
    <div class="col s12 m4">
        <div class="card medium">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${data.crestUrl}" alt="Logo ${data.name}" height="200">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">info_outline</i></span>
                </div>
            <div class="card-action">
                <a href="./detail-team.html?id=${data.id}&favorited=${favorited}" class="waves-effect waves-light btn cyan accent-4">Detail</a>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
                <ul class="collection">
                    <li class="collection-item">
                        <i class="material-icons tiny">place</i>  ${data.address}
                    </li>
                    <li class="collection-item">
                        <i class="material-icons tiny">phone</i>  ${data.phone}
                    </li>
                    <li class="collection-item">
                        <i class="material-icons tiny">email</i>  ${data.email}
                    </li>
                    <li class="collection-item">
                        <i class="material-icons tiny">web</i>  ${data.website}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

function teamContent(data) {
    let detailInfoHTML = `
    <div class="center">
        <img src="${data.crestUrl}" alt="Logo ${data.name}" height="300" width="300">
    </div>
    <ul class="collection with-header">
        <li class="collection-header">
            <h4>Detail Info</h4>
        </li>
        <li class="collection-item">
            ${data.address}<span class="secondary-content"><i class="material-icons cyan-text text-accent-4">place</i></span>
        </li>
        <li class="collection-item">
            ${data.phone}<span class="secondary-content"><i class="material-icons cyan-text text-accent-4">phone</i></span>
        </li>
        <li class="collection-item">
            ${data.email}<span class="secondary-content"><i class="material-icons cyan-text text-accent-4">email</i></span>
        </li>
        <li class="collection-item">
            ${data.website}<span class="secondary-content"><i class="material-icons cyan-text text-accent-4">web</i></span>
        </li>
    </ul>
    `;
    document.querySelector('#detail-info').innerHTML = detailInfoHTML;

    let squad = data.squad;
    let squadsInfoHTML = '';
    for (let i in squad) {
        let name = squad[i].name;
        squadsInfoHTML += `
        <li class="collection-item avatar">
            <span class="num-player">${name.charAt(0)}</span>
            <span class="title">${name}</span>
            <p>
                ${squad[i].position}
            </p>
        </li>`;
    }
    document.querySelector('#squad-info').innerHTML = squadsInfoHTML;
}
