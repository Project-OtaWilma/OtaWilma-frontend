import {
    fetchJson,
    getCookie,
    removeCache,
    cacheAvailable
} from './utility'


//const otaWilmaAPi = 'https://otawilma-api.tuukk.dev/api';
const otaWilmaAPi = 'https://beta.otawilma-api.tuukk.dev/api';
//const otaWilmaAPi = 'http://localhost:8302/api';


const login = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaAPi}/login/`;

        fetchJson(url, {
            method: 'POST',
            headers: {
                'token': auth
            }
        })
            .then(status => {
                return resolve(status);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    })
}

const fetchConfig = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaAPi}/config/`;

        fetchJson(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
        })
            .then(config => {
                return resolve(config);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    })
}

const fetchLoginHistory = () => {
    return new Promise((resolve, reject) => {
        const auth = getCookie('token');
        const url = `${otaWilmaAPi}/config/login-history`;

        fetchJson(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
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

const fetchTheme = (auth, id) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaAPi}/themes/get/${id}`;

        fetchJson(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
        })
            .then(theme => {
                return resolve(theme);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const fetchThemeList = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaAPi}/themes/list`;

        fetchJson(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
        })
            .then(theme => {
                return resolve(theme);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const setTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const auth = getCookie('token');
        const configUrl = `${otaWilmaAPi}/config/`;
        const themeUrl = `${otaWilmaAPi}/config/set/current-theme`;

        if (cacheAvailable) removeCache('config-cache', configUrl);

        fetchJson(themeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': auth
            },
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

const createTheme = (auth, preset) => {
    return new Promise(async (resolve, reject) => {
        const configUrl = `${otaWilmaAPi}/config`;
        const createUrl = `${otaWilmaAPi}/themes/create/${preset}`;
        const listUrl = `${otaWilmaAPi}/themes/list`;

        if (cacheAvailable) removeCache('config-cache', configUrl);
        if (cacheAvailable) removeCache('theme-cache', listUrl);

        fetchJson(createUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': auth
            },
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
        const auth = getCookie('token');
        const themeUrl = `${otaWilmaAPi}/themes/get/${id}`;
        const configUrl = `${otaWilmaAPi}/config`;
        const listUrl = `${otaWilmaAPi}/themes/list`;
        const removeUrl = `${otaWilmaAPi}/themes/${id}/remove`;

        if (cacheAvailable) removeCache('theme-cache', themeUrl);
        if (cacheAvailable) removeCache('config-cache', configUrl);
        if (cacheAvailable) removeCache('theme-cache', listUrl);

        fetchJson(removeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': auth
            },
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
        const auth = getCookie('token');
        const themeUrl = `${otaWilmaAPi}/themes/get/${id}`;
        const themeList = `${otaWilmaAPi}/themes/list`;
        const editUrl = `${otaWilmaAPi}/themes/${id}/edit/colors`;

        if (cacheAvailable) removeCache('theme-cache', themeUrl);
        if (cacheAvailable) removeCache('theme-cache', themeList);

        fetchJson(editUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': auth
            },
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
        const auth = getCookie('token');
        const themeUrl = `${otaWilmaAPi}/themes/get/${id}`;
        const listUrl = `${otaWilmaAPi}/themes/list/`;
        const editUrl = `${otaWilmaAPi}/themes/${id}/edit/background`;

        if (cacheAvailable) removeCache('theme-cache', themeUrl);
        if (cacheAvailable) removeCache('theme-cache', listUrl);


        fetchJson(editUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': auth
            },
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


export {
    login,
    fetchConfig,
    fetchDefaultTheme,
    fetchTheme,
    fetchThemeList,
    createTheme,
    deleteTheme,
    editThemeBackground,
    editThemeColors
}