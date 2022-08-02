const cacheAvailable = 'caches' in window;
const defaults = ['light', 'dark'];
const otaWilmaAPi = 'https://otawilma-api.tuukk.dev/api';
// const otaWilmaAPi = 'http://localhost:8302/api';

const state = {
    config: {},
    current: {
        id: null,
        theme: {},
        element: null
    },
    themes: [],
    frontpage: {
        schedule: null
    },
    messages: {
        categories: {
            current: 'inbox'
        }
    },
    grades: {
        current: 'LOPS2021'
    },
    news: {
        categories: {
            current: 'current'
        }
    },
    filters: {
        subjects: [],
        teachers: []
    },
    periods: [

    ]
}


const fetchConfig = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/sessions/config/get/${session}`;

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) {
            const config = await loadCache('config-cache', url).catch(() => { });

            if (config) {
                console.warn(`Loaded config from cache`);
                return resolve(config);
            }
        }

        fetch(url)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        appendCache('config-cache', url);
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
                }
            })
            .catch(err => {
                return reject({ err: "Failed to reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const fetchLoginHistory = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/sessions/config/login-history/get/${session}`;

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        fetch(url)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
                }
            })
            .catch(err => {
                return reject({ err: "Failed to reach servers (OtaWilma-API)", status: 503 })
            })
    });
}


const fetchDefaultTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaAPi}/themes/defaults/get/${id}`;

        if (cacheAvailable) {
            const theme = await loadCache('theme-cache', url).catch(() => { });

            if (theme) {
                console.warn(`Loaded default-theme from cache: ${url.split('/').reverse()[0]}`);
                return resolve(theme);
            }
        }

        fetch(url)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        appendCache('theme-cache', url);
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const fetchTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/themes/get/${session}/${id}`;

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) {
            const theme = await loadCache('theme-cache', url).catch(() => { })

            if (theme) {
                console.warn(`Loaded theme from cache: ${url.split('/').reverse()[0]}`);
                return resolve(theme);
            }
        }

        fetch(url)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        appendCache('theme-cache', url);
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
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

const InitializeThemesDefault = () => {
    return new Promise((resolve, reject) => {
        fetchDefaultTheme('light')
            .then(theme => {
                state.current.theme = theme;
                return resolve();
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

    const nameElement = document.getElementById('username');
    if (nameElement) nameElement.textContent = state.config['username'].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    colors.forEach(key => {
        root.style.setProperty(key.trim(), theme.colors[key].value);
    });

    background.style.background = `url(${theme.background.url.value})`;

    const filter = `
    blur(${theme.background.blur.value}px)
     opacity(${theme.background.opacity.value}%)
     brightness(${theme.background.brightness.value}%)
     contrast(${theme.background.contrast.value}%)
     saturate(${theme.background.saturate.value}%)
     grayscale(${theme.background.grayscale.value}%)
     sepia(${theme.background.sepia.value}%)
     hue-rotate(${theme.background['hue-rotate'].value}deg)
     invert(${theme.background.invert.value}%)
    `;

    root.style.setProperty('--background-filter', filter);
}

const fetchThemeList = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/themes/list/${session}`;

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) {
            const list = await loadCache('theme-cache', url).catch(() => { });

            if (list) {
                console.warn(`Loaded theme-list from cache`);
                return resolve(list);
            }
        }

        fetch(url)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        appendCache('theme-cache', url);
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const setTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/sessions/config/get/${session}`;

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) removeCache('config-cache', url);

        fetch(`${otaWilmaAPi}/sessions/config/current-theme/set/${session}`, {
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
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const createTheme = () => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/sessions/config/get/${session}`;
        const list = `${otaWilmaAPi}/themes/list/${session}`;

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) removeCache('config-cache', url);
        if (cacheAvailable) removeCache('theme-cache', list);

        fetch(`${otaWilmaAPi}/themes/create/${session}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const deleteTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/themes/get/${session}/${id}`;
        const config = `${otaWilmaAPi}/sessions/config/get/${session}`;
        const list = `${otaWilmaAPi}/themes/list/${session}`;

        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) removeCache('theme-cache', url);
        if (cacheAvailable) removeCache('config-cache', config);
        if (cacheAvailable) removeCache('theme-cache', list);

        fetch(`${otaWilmaAPi}/themes/remove/${session}/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid request", error: json, status: 400 })
                    case 401:
                        return reject({ err: "Invalid session identifier", error: json, status: 401, redirect: true })
                    default:
                        return reject({ err: "Received an unexpected response from server", error: res.status, status: 500 })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const editThemeColors = (id, key, value) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/themes/get/${session}/${id}`;
        const list = `${otaWilmaAPi}/themes/list/${session}`;


        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) removeCache('theme-cache', url);
        if (cacheAvailable) removeCache('theme-cache', list);

        fetch(`${otaWilmaAPi}/themes/edit/colors/${session}/${id}`, {
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
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/themes/get/${session}/${id}`;
        const list = `${otaWilmaAPi}/themes/list/${session}`;


        if (!session) {
            return reject({ err: "Couldn't locate session identifier", status: 400, redirect: true });
        }

        if (cacheAvailable) removeCache('theme-cache', url);
        if (cacheAvailable) removeCache('theme-cache', list);


        fetch(`${otaWilmaAPi}/themes/edit/background/${session}/${id}`, {
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

const loadCache = (cache, path) => {
    return new Promise((resolve, reject) => {
        caches.open(cache)
            .then(cache => {

                cache.match(path).then(async (res) => {

                    if (!res) return reject({ err: "Resource doesn't exists in cache" })

                    const json = await res.json();

                    switch (res.status) {
                        case 200:
                            return resolve(json);
                        default:
                            cache.delete(path);
                            return reject({ err: "Resource doesn't exists in cache" })
                    }
                })
                    .catch(() => {
                        cache.delete(path);
                        return reject({ err: 'Failed to access cached resource', status: 500.3 });
                    })
            })
            .catch(() => {
                return reject({ err: 'Failed to acess cache', status: 500.3 });
            })
    });
}

const appendCache = (cache, path) => {
    return new Promise((resolve, reject) => {
        caches.open(cache)
            .then(cache => {

                cache.add(path).then(() => {
                    return resolve();
                })
                    .catch(err => {
                        console.log(err);
                        return reject({ err: 'Failed to add cache resource', status: 500.3 });
                    })

            })
            .catch(() => {
                return reject({ err: 'Failed to acess cache', status: 500.3 });
            })
    });
}

const removeCache = (cache, path) => {
    return new Promise((resolve, reject) => {
        caches.open(cache)
            .then(cache => {

                cache.delete(path).then(() => {
                    return resolve();
                })
                    .catch(() => {
                        return reject({ err: 'Failed to delete cached resource', status: 500.3 });
                    })

            })
            .catch(() => {
                return reject({ err: 'Failed to access cache', status: 500.3 });
            })
    });
}


0

const getCachedUrls = async (cacheName) => {
    const urls = (await (await caches.open(cacheName)).keys()).map(i => i.url)
    return urls
}

const clearCache = (cache) => {
    return new Promise((resolve, reject) => {
        getCachedUrls(cache)
            .then(async (urls) => {
                for (let i = 0; i < urls.length; i++) {
                    const url = urls[i];

                    await removeCache(cache, url);
                }
                console.warn(`Cleared "${cache}"`);
                return resolve();
            })
            .catch(err => {
                return reject(err);
            })
    })
}


const hexToRgb = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: opacity
    } : null;
}

const rgbToHex = (r, g, b) => '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
const parseRgb = (input) => input.split("(")[1].split(")")[0].split(",").map(c => Number.parseFloat(c));

