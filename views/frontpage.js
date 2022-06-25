document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const defaults = ['light', 'dark'];

const state = {
    config: {},
    current: {
        id: null,
        theme: {}
    },
    themes: []
}

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes();

    document.getElementById('loading').style.opacity = 0;
}

const InitializeThemes = () => {
    return new Promise((resolve, reject) => {

        fetchConfig()
            .then(config => {
                state.config = config;
                state.current.id = config['current-theme'];

                fetchTheme(state.current.id)
                    .then(theme => {
                        state.current.theme = theme;
                        loadTheme(theme);
                        return resolve();
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
            .catch(err => {
                console.error(err);
            })
    })
}

const loadTheme = (theme) => {
    const root = document.documentElement;
    const background = document.getElementById('background');
    const colors = Object.keys(theme.colors);

    colors.forEach(key => {
        root.style.setProperty(key, theme.colors[key]);
    });

    background.style.background = `url(${theme.background.url})`;

    const filter = `
    blur(${theme.background.blur}px)
     opacity(${theme.background.opacity}%)
     brightness(${theme.background.brightness}%)
     contrast(${theme.background.contrast}%)
     saturate(${theme.background.saturate}%)
     grayscale(${theme.background.grayscale}%)
     sepia(${theme.background.sepia}%)
     hue-rotate(${theme.background['hue-rotate']}deg)
     invert(${theme.background.invert}%)
    `;

    background.style.filter = filter;
}