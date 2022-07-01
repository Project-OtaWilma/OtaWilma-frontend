
const defaults = ['light', 'dark'];

const state = {
    config: {},
    current: {
        id: null,
        theme: {}
    },
    themes: []
}

const fetchConfig = () => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400 });
        }

        fetch(`http://localhost:3000/api/sessions/config/get/${session}`)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier (OtaWilma2SID)", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: 'Received an unexpected response from servers', status: res.status })
                }
            })
            .catch(err => {
                return reject({ err: "Failed to reach servers (OtaWilma-API)", status: 503 })
            })
    });
}


const fetchTheme = (id) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400 });
        }

        fetch(`http://localhost:3000/api/themes/get/${session}/${id}`)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier (OtaWilma2SID)", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
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
                return reject(err);
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

const fetchThemeList = () => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400 });
        }

        fetch(`http://localhost:3000/api/themes/list/${session}`)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    case 401:
                        return reject({ err: "Invalid session identifier (OtaWilma2SID)", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const setTheme = (id) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400 });
        }

        fetch(`http://localhost:3000/api/sessions/config/current-theme/set/${session}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "theme": id
            })

        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    case 401:
                        return reject({ err: "Invalid session identifier (OtaWilma2SID)", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const editThemeColors = (id, key, value) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400 });
        }

        fetch(`http://localhost:3000/api/themes/edit/colors/${session}/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "key": key,
                "value": value
            })

        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    case 401:
                        return reject({ err: "Invalid session identifier (OtaWilma2SID)", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const editThemeBackground = (id, key, value) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400 });
        }

        fetch(`http://localhost:3000/api/themes/edit/background/${session}/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "key": key,
                "value": value
            })

        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    case 401:
                        return reject({ err: "Invalid session identifier (OtaWilma2SID)", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const hexToRgb = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: opacity / 100
    } : null;
}

const rgbToHex = (r, g, b) => '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);

const parseRgb = (raw) => {
    return raw.replace(/[^\d,]/g, '').split(',');
}

