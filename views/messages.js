document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});


const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes();

    document.getElementById('loading').style.opacity = 0;
}