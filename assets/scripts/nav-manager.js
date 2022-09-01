const InitializeNavBar = () => {
    const root = document.getElementById('top');
    Array.from(root.getElementsByTagName('button')).forEach(button => {

        button.addEventListener('click', (e) => {
            redirect(e.target.id, false);
        });

        button.addEventListener('contextmenu', (e) => {
            redirect(e.target.id, true);
            e.preventDefault();
        });
    });

    const logoutElement = document.getElementById('logout');

    if (logoutElement) {
        document.getElementById('logout').addEventListener('click', () => {
            logout()
                .then(() => {
                    window.location = '/';
                })
                .catch(err => {
                    displayError(err);
                })
        })
    }
}

const redirect = (target, createWindow) => {
    if(createWindow) return window.open(target);
    
    document.getElementById('loading').style.opacity = 1;
    
    setTimeout(() => {
        document.location = target;
    }, 600);
}


const redirectToWilma = (path) => {
    window.open(`https://espoo.inschool.fi/${path}`)
}