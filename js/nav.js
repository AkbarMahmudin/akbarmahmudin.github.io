document.addEventListener('DOMContentLoaded', function () {
    // Activate sidebar nav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status !== 200) return;

                // Membuat daftar menu tautan
                document.querySelectorAll('.topnav, .sidenav').forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener utk setiap tautan menu
                document.querySelectorAll('.sidenav a, .topnav a').forEach(function (elm) {
                    elm.addEventListener('click', function (event) {
                        // tutup sidenav
                        const sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute('href').substr(1);
                        loadPage(page);
                    })
                })
            }
        };
        xhttp.open('GET', 'nav.html', true);
        xhttp.send();
    }

    // Load page content
    let page = window.location.hash.substr(1);
    if (page == '') page = 'home';
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4) {
                const content = document.querySelector('#body-content');
                
                if (page === 'home') {
                    getMatchToday();
                } else if (page === 'favorite'){
                    getFavoriteTeams();
                }
                
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                    select();
                } else if (this.status == 404) {
                    content.innerHTML = '<p>Halaman tidak ditemukan</p>';
                } else {
                    content.innerHTML = '<h3 class="center" style="margin: 20%">Ups... halaman tidak dapat diakses</h3>';
                }
            }
        };
        xhttp.open('GET', `pages/${page}.html`, true);
        xhttp.send();
    }
});