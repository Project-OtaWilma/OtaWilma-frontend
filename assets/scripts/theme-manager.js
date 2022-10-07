/*

    Contains all the theme-related requests. Requires "/assets/scripts/requests.js/"

*/


const otaWilmaAPi = 'https://otawilma-api.tuukk.dev/api';
// const otaWilmaAPi = 'http://localhost:8302/api';

const defaults = ['light', 'dark'];
const configufation = {
    config: {},
    current: {
        id: null,
        theme: {},
        element: null
    },
    themes: [],
}


const fetchConfig = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/sessions/config/get/${session}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });


        fetchJson(url, {
            method: 'GET',
            cache: 'config-cache'
        })
            .then(config => {
                return resolve(config);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const fetchLoginHistory = () => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/sessions/config/login-history/get/${session}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });

        fetchJson(url, {
            method: 'GET'
        })
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(err);
            })
    });
}


const fetchDefaultTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaAPi}/themes/defaults/get/${id}`;

        fetchJson(url, {
            method: 'GET',
            cache: 'theme-cache'
        })
            .then(theme => {
                return resolve(theme);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const fetchTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/themes/get/${session}/${id}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });

        fetchJson(url, {
            method: 'GET',
            cache: 'theme-cache'
        })
            .then(theme => {
                return resolve(theme);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const fetchThemeList = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/themes/list/${session}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });

        fetchJson(url, {
            method: 'GET',
            cache: 'theme-cache'
        })
            .then(theme => {
                return resolve(theme);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const InitializeThemes = () => {
    return new Promise((resolve, reject) => {
        fetchConfig()
            .then(config => {
                configufation.config = config;
                configufation.current.id = config['current-theme'];

                fetchTheme(configufation.current.id)
                    .then(theme => {
                        configufation.current.theme = theme;
                        loadTheme(theme);
                        return resolve();
                    })
                    .catch(err => {
                        return reject(err);
                    })
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const InitializeThemesDefault = () => {
    return new Promise((resolve, reject) => {
        fetchDefaultTheme('light')
            .then(theme => {
                configufation.current.theme = theme;
                loadTheme(theme);
                return resolve();
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const loadTheme = (theme) => {
    const root = document.documentElement;
    const background = document.getElementById('background');
    const colors = Object.keys(theme.colors);

    const nameElement = document.getElementById('username');
    if (nameElement) nameElement.textContent = username(configufation.config['username']);

    colors.forEach(key => {
        root.style.setProperty(key.trim(), theme.colors[key].value);
    });

    background.style.background = `url(${theme.background.url.value})`;
    root.style.setProperty('--background-filter', filter(theme));
}

const setTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const configUrl = `${otaWilmaAPi}/sessions/config/get/${session}`;
        const themeUrl = `${otaWilmaAPi}/sessions/config/current-theme/set/${session}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        if (cacheAvailable) removeCache('config-cache', configUrl);

        fetchJson(themeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "theme": id
            })
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const createTheme = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const configUrl = `${otaWilmaAPi}/sessions/config/get/${session}`;
        const createUrl = `${otaWilmaAPi}/themes/create/${session}`;
        const listUrl = `${otaWilmaAPi}/themes/list/${session}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        if (cacheAvailable) removeCache('config-cache', configUrl);
        if (cacheAvailable) removeCache('theme-cache', listUrl);

        fetchJson(createUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const deleteTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const themeUrl = `${otaWilmaAPi}/themes/get/${session}/${id}`;
        const configUrl = `${otaWilmaAPi}/sessions/config/get/${session}`;
        const listUrl = `${otaWilmaAPi}/themes/list/${session}`;
        const removeUrl = `${otaWilmaAPi}/themes/remove/${session}/${id}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        if (cacheAvailable) removeCache('theme-cache', themeUrl);
        if (cacheAvailable) removeCache('config-cache', configUrl);
        if (cacheAvailable) removeCache('theme-cache', listUrl);

        fetchJson(removeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const editThemeColors = (id, key, value) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const themeUrl = `${otaWilmaAPi}/themes/get/${session}/${id}`;
        const themeList = `${otaWilmaAPi}/themes/list/${session}`;
        const editUrl = `${otaWilmaAPi}/themes/edit/colors/${session}/${id}`;


        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        if (cacheAvailable) removeCache('theme-cache', themeUrl);
        if (cacheAvailable) removeCache('theme-cache', themeList);

        fetchJson(editUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "key": key,
                "value": value
            })
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err);
            });
    });
}

const editThemeBackground = (id, key, value) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const themeUrl = `${otaWilmaAPi}/themes/get/${session}/${id}`;
        const listUrl = `${otaWilmaAPi}/themes/list/${session}`;
        const editUrl = `${otaWilmaAPi}/themes/edit/background/${session}/${id}`;

        if (!session) return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        if (cacheAvailable) removeCache('theme-cache', themeUrl);
        if (cacheAvailable) removeCache('theme-cache', listUrl);


        fetchJson(editUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "key": key,
                "value": value
            })
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(err);
            });
    });
}

const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}

const filter = (theme) => `blur(${theme.background.blur.value}px)
     opacity(${theme.background.opacity.value}%)
    brightness(${theme.background.brightness.value}%)
    contrast(${theme.background.contrast.value}%)
    saturate(${theme.background.saturate.value}%)
    grayscale(${theme.background.grayscale.value}%)
    sepia(${theme.background.sepia.value}%)
    hue-rotate(${theme.background['hue-rotate'].value}deg)
    invert(${theme.background.invert.value}%)`