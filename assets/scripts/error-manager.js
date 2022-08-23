const errors = {
    503: {
        status: 'Palvelin',
        name: 'Palvelimeen ei saatu yhteyttä',
        description: 'Palvelimeen ei syystä tai toisesta saada yhteyttä.'
    },
    501: {
        status: 'Wilma',
        name: 'Wilman palvelimien odottamaton toiminta',
        description: 'Wilman palvelimet vastasivat odottamattomalla tavalla. Todennäköisimmin Wilman palvelimet ovat alhaalla, mutta ongelma saattaa myös johtua uudistuksista Wilman puolella. Ongelman toistuessa ota yhteyttä kehittäjään'
    },
    500: {
        status: 'OtaWilma',
        name: 'Sisäinen palvelinvirhe',
        description: 'OtaWilman palvelin epäonnistui pyyntösi käsittelyssä. Ilmoita ongelmasta kehittäjälle avaamalla consolin näppäinyhdistelmällä <strong>"ctrl + shift + i"<strong>'
    },
    500.3: {
        status: 'OtaWilma',
        name: 'Selainpuolen virhe',
        description: 'Sivun lataus epäonnistui tuntemattomista syistä. Ilmoita ongelmasta kehittäjälle'
    },
    400: {
        status: 'Pyynnöt',
        name: 'Virheelliset parametrit pyynnössä',
        description: 'Selaimen lähettämän pyynnön parametrit olivat virheelliset. Ilmoita ongelmasta kehittäjälle avaamalla consolin näppäinyhdistelmällä <strong>"ctrl + shift + i"<strong>'
    },
    401: {
        status: 'Käyttöoikeudet',
        name: 'Puuttuvat oikeudet',
        description: 'Sinulla ei ole oikeutta pyytämääsi resurssiin. Yritä uudelleen kirjautumista jos uskot tämän olevan virhe'
    },
    429: {
        status: 'Pyynnöt',
        name: 'Odotas hetkinen',
        description: 'Selaimesi lähettää tavallista enemmän pyyntöjä palvelimelle. Sinulla tuskin on kuitenkaan tarvetta luoda ja poistaa teemoja jatkuvasti. Jos epäilet että kyseessä on virhe, tarkista että selaimesi välimuisti on käytössä. Ota ongelmatilanteessa yhteyttä kehittäjään.'
    }
}

const displayError = (err) => {
    const status = err.status ? err.status : 500;
    const raw = err.error ? err.error.err : 'Lisätietoja ongelmasta ei ole saatavilla';

    if (err.redirect) {
        window.location = err.info ? `/index.html?error=${status}` : `/index.html`
        return;
    }

    const root = document.createElement('div');
    root.className = 'error-container';

    const error = document.createElement('div');
    error.className = 'error-object';

    const errorImage = document.createElement('div');
    errorImage.className = 'error-image';

    const title = document.createElement('h1');
    title.textContent = `${status} - ${errors[status].name}`;

    const titleRaw = document.createElement('h3');
    titleRaw.textContent = raw;    

    const description = document.createElement('h2');
    description.innerHTML = errors[status].description;

    const infoTitle = document.createElement('h4');
    const infoContent = document.createElement('h7');

    const statusElement = document.createElement('h5');
    statusElement.textContent = `${status} - ${errors[status].status}`;

    error.appendChild(errorImage);
    error.appendChild(title);
    error.appendChild(titleRaw);
    error.appendChild(description);
    error.appendChild(infoTitle);

    if (err.info) {
        infoTitle.textContent = 'Ilmoita seuraavat tiedot kehittäjälle';
        infoContent.innerHTML = `location: ${window.location.pathname}<br>error: ${raw}<br>info: ${err.info}`;
        error.appendChild(infoContent);
    }

    error.appendChild(statusElement);

    root.appendChild(error);
    document.body.appendChild(root);
}

