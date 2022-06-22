document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
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
            loginError.textContent = err.error;
        })
    })
}