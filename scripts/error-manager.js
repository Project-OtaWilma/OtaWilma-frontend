const errors = {
    503: {
        status: 'Palvelin',
        name: 'Palvelimeen ei saatu yhteyttä',
        description: 'Palvelimeen ei syystä tai toisesta saada yhteyttä. Varmista verkkoyhteytesi ja selvitä, että esiintyykö vastaava ongelma muilla.'
    },
    501: {
        status: 'Wilma',
        name: 'Wilman palvelimien odottamaton toiminta',
        description: 'Wilman palvelimet vastasivat odottamattomalla tavalla. Todennäköisimmin Wilman palvelimet ovat alhaalla, mutta ongelma saattaa myös johtua uudistuksista Wilman puolella. Ongelman toistuessa ota yhteyttä kehittäjään'
    },
    500: {
        status: 'OtaWilma',
        name: 'Sisäinen palvelinvirhe',
        description: 'OtaWilman palvelin epäonnistui pyyntösi käsittelyssä. Ilmoita ongelmasta kehittäjälle'
    },
    400: {
        status: 'Pyynnöt',
        name: 'Virheelliset parametrit pyynnössä',
        description: 'Selaimen lähettämän pyynnön parametrit olivat virheelliset. Ongelman toistuessa ilmoita ongelmasta kehittjälle'
    },
    401: {
        status: 'Käyttöoikeudet',
        name: 'Puuttuvat oikeudet',
        description: 'Sinulla ei ole oikeutta pyytämääsi resurssiin. Yritä uudelleen kirjautumista jos uskot tämän olevan virhe'
    }
}

const displayError = (err) => {

    if (err.redirect) {
        window.location = '/index.html'
        return;
    }

    console.log(err);

    const root = document.createElement('div');
    root.className = 'error-container';

    const error = document.createElement('div');
    error.className = 'error-object';

    const errorImage = document.createElement('div');
    errorImage.className = 'error-image';

    const title = document.createElement('h1');
    title.textContent = `${err.status} - ${errors[err.status].name}`;

    const titleRaw = document.createElement('h3');

    if (err.error) {
        titleRaw.textContent = err.error.err;
    }

    const description = document.createElement('h2');
    description.textContent = errors[err.status].description;


    const statusElement = document.createElement('h5');
    statusElement.textContent = `${err.status} - ${errors[err.status].status}`;

    error.appendChild(errorImage);
    error.appendChild(title);
    error.appendChild(titleRaw);
    error.appendChild(description);
    error.appendChild(statusElement);

    root.appendChild(error);
    document.body.appendChild(root);
}