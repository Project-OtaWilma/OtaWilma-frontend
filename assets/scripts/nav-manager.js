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
    const logout = document.getElementById('logout');

    if(logout) {
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