document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    })

    document.getElementById('loading').style.opacity = 0;
}