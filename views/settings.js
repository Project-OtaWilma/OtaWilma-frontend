document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = () => {
    // DEBUG
    const url = '../assets/themes/light.json';

    fetchTheme(url)
    .then(theme => {
        loadTheme(theme);
    })
    .catch(err => {
        console.error(err);
    })
}