document.addEventListener('DOMContentLoaded', () => {
    Initialize();

});

const Initialize = () => {
    InitializeLoginForm();
    InitializeTermsOfService();
    InitializeError();
}

const InitializeLoginForm = async () => {
    const loginForm = document.forms['login'];
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const credentials = {
            username: loginForm['username'].value,
            password: loginForm['password'].value
        }

        Account.Login(credentials)
            .then(() => {

            })
            .catch(err => {
                console.log(err);
                loginError.textContent = err.err;
            })
    })
}

const InitializeTermsOfService = () => {
    const session = getCookie('session');
    if(session) { return; }

    const main = document.getElementById('main');
    main.style.filter = 'blur(3px)';

    const root = document.getElementById('terms-of-service');
    root.style.display = 'flex';

    const accept = document.getElementById('accept');

    accept.addEventListener('click', () => {
        Account.createAccout()
        .then(() => {
            root.style.display = 'none';
            main.style.filter = 'none';
        })
    })

}

const InitializeError = () => {
    const code = getParameterByName('error');

    if(!code) return;

    displayError({err: '', status: code, info: getCookie('session')})
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}