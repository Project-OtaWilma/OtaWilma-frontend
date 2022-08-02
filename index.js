document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const translations = {
    'Invalid login-credentials': 'Käyttäjätunnusta ei löydy tai salasana on väärä',
    '"username" is not allowed to be empty': 'Käyttäjätunnus ei voi olla tyhjä',
    '"password" is not allowed to be empty': 'Salasana ei voi olla tyhjä',
    'You are not whitelisted for OtaWilma [CLOSED BETA]': 'OtaWilmaa on vielä testausvaiheessa, ja ainoastaan testausryhmään kuuluvat henkilöt voivat kirjautua.'
}

const Initialize = async () => {
    await InitializeTheme();
    await InitializeVersion();
    InitializeLoginForm();
    InitializeError();

    document.getElementById('loading').style.opacity = 0;
}

const InitializeVersion = () => {
    return new Promise((resolve, reject) => {
        getVersion()
            .then(version => {
                document.getElementById('version-tag').textContent = `Version ${version.version} BETA`;
                return resolve();
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const InitializeTheme = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');

        if (session) {
            await InitializeThemes().catch(err => {
                return reject(err);
            })
        }
        else {
            await InitializeThemesDefault().catch(err => {
                return reject(err);
            })
        }

        return resolve();
    })
}

const InitializeLoginForm = async () => {
    const sessionField = document.getElementById('session-field');
    const requirements = [document.getElementById('agreement'), document.getElementById('terms-of-service')];
    const loginButton = document.getElementById('login-button');

    Array.from(document.getElementsByClassName('login-form')).forEach(e => e.addEventListener('submit', (e) => {
        e.preventDefault();
        loginEvent();
    }))

    sessionField.value = getCookie('session') ? getCookie('session') : null;

    if (sessionField.value.length > 0) requirements.forEach(r => { r.checked = true });

    loginButton.addEventListener('click', async (e) => {
        loginEvent();
    })

}

const loginEvent = async () => {

    setLoadingScreen(true);

    const usernameField = document.getElementById('username-field');
    const passwordField = document.getElementById('password-field');
    const sessionField = document.getElementById('session-field');

    const requirements = [document.getElementById('agreement'), document.getElementById('terms-of-service')];
    const loginError = document.getElementById('login-error');
    loginError.textContent = '';

    const credentials = {
        username: usernameField.value,
        password: passwordField.value
    }

    const accepted = requirements.map(r => r.checked)

    if (accepted.includes(false)) {
        loginError.textContent = 'Sinun on hyväksyttävä molemmat ehdot';
        setLoadingScreen(false);
        return;
    }

    if (sessionField.value.length > 0) {
        await Account.validateOtaWilmaAccount(sessionField.value)
            .then(() => {
                Account.Login(credentials)
                    .then(async () => {
                        Account.loginToSession(credentials.username)
                        .then(() => {
                            document.cookie = `session=${sessionField.value}; SameSite=Lax; Secure; max-age=31536000; path=/`;
                            window.location = '/views/frontpage.html';
                        })
                        .catch(err => {
                            const error = err.err;
                            console.log(err);
                            loginError.textContent = 'Kirjautuminen OtaWilmaan epäonnistui';
                            setLoadingScreen(false);
                            return;
                        })
                    })
                    .catch(err => {
                        const error = err.err;
                        loginError.textContent = Object.keys(translations).includes(error) ? translations[error] : error;
                        setLoadingScreen(false);
                        return;
                    })
            })
            .catch(err => {
                switch (err.status) {
                    case 400:
                        loginError.textContent = 'Virheellinen OtaWilma-tunnus. Jätä kenttä tyhjäksi jos haluat luoda uuden käyttäjän OtaWilmaan';
                        setLoadingScreen(false);
                        return;
                    default:
                        throw err;
                }
            })
    }
    else {
        Account.Login(credentials)
            .then(() => {
                createAccout(credentials.username)
                    .then(() => {
                        Account.loginToSession(credentials.username)
                        .then(() => {
                            window.location = '/views/frontpage.html';
                        })
                        .catch(err => {
                            const error = err.err;
                            console.log(err);
                            loginError.textContent = 'Kirjautuminen OtaWilmaan epäonnistui';
                            setLoadingScreen(false);
                            return;
                        })
                    })
                    .catch(err => {
                        displayError(err);
                        throw err;
                    })
            })
            .catch(err => {
                const error = err.err;
                loginError.textContent = Object.keys(translations).includes(error) ? translations[error] : error;
                setLoadingScreen(false);
                return;
            })

    }
}

const InitializeError = () => {
    const code = getParameterByName('error');

    if (!code) return;

    displayError({ err: '', status: code, info: getCookie('session') })
}

const setLoadingScreen = (value) => {
    document.getElementById('login-loading-screen').style.display = value ? 'flex' : 'none';
    document.getElementById('login-container').style.filter = value ? 'blur(2px)' : 'none'
}