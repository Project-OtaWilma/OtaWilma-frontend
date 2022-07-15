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
    InitializeLoginForm();
    InitializeError();

    document.getElementById('loading').style.opacity = 0;
}

const InitializeTheme = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
    
        if(session) {
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
    const usernameField = document.getElementById('username-field');
    const passwordField = document.getElementById('password-field');
    const sessionField = document.getElementById('session-field');

    const requirements = [document.getElementById('agreement'), document.getElementById('terms-of-service')];

    const loginButton = document.getElementById('login-button');
    const loginError = document.getElementById('login-error');


    sessionField.value = getCookie('session') ? getCookie('session') : null;

    
    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();
        loginError.textContent = ''

        const accepted = requirements.map(r => r.checked)

        if(accepted.includes(false)) {
            loginError.textContent = 'Sinun on hyväksyttävä molemmat ehdot'
            return;
        }

        const credentials = {
            username: usernameField.value,
            password: passwordField.value
        }

        
        if(sessionField.value.length > 0) {
            await Account.validateOtaWilmaAccount(sessionField.value)
                .then(() => {
                    Account.Login(credentials)
                    .then(() => {
                        document.cookie = `session=${sessionField.value}; SameSite=Lax; Secure;`;
                        window.location = '/views/frontpage.html';
                    })
                    .catch(err => {
                        const error = err.err;
                        loginError.textContent = Object.keys(translations).includes(error) ? translations[error] : error;
                        return;
                    })
                })
                .catch(err => {
                    switch(err.status) {
                        case 400:
                            loginError.textContent = 'Virheellinen OtaWilma-tunnus. Jätä kenttä tyhjäksi jos haluat luoda uuden käyttäjän OtaWilmaan'
                            return;
                        default:
                            throw err;
                    }
                })
        }
        else {
            Account.Login(credentials)
            .then(() => {
                createAccout()
                .then(() => {
                    window.location = '/views/frontpage.html';
                })
                .catch(err => {
                    displayError(err);
                    throw err;
                })
            })
            .catch(err => {
                const error = err.err;
                loginError.textContent = Object.keys(translations).includes(error) ? translations[error] : error;
                return;
            })

        }
        

    })
    
}

const InitializeError = () => {
    const code = getParameterByName('error');

    if(!code) return;

    displayError({err: '', status: code, info: getCookie('session')})
}

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}