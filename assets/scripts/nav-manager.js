const InitializeNavBar = () => {
    const root = document.getElementById('top');
    Array.from(root.getElementsByTagName('button')).forEach(button => {

        button.addEventListener('click', (e) => {
            document.getElementById('loading').style.opacity = 1;
            setTimeout(() => {
                document.location = e.target.id;
            }, 600);
        })
    });
    const logoutElement = document.getElementById('logout');

    if(logoutElement) {
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


const redirectToWilma = (path) => {
    window.open(`https://espoo.inschool.fi/${path}`)
}