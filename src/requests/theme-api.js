import {
    fetchJson,
    getCookie,
    removeCache,
    cacheAvailable
} from './utility'

const { otaWilmaApi } = require('../config.json');


const login = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/login/`;

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
                return reject(err);
            })
    })
}

const fetchConfig = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/config/`;

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
                return reject(err);
            })
    })
}

const fetchDefaultTheme = (id) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/themes/defaults/get/${id}`;

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
        const url = `${otaWilmaApi}/themes/get/${id}`;

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
        const url = `${otaWilmaApi}/themes/list`;

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

const setTheme = (auth, id) => {
    return new Promise(async (resolve, reject) => {
        const configUrl = `${otaWilmaApi}/config/`;
        const themeUrl = `${otaWilmaApi}/config/set/current-theme`;

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
        const configUrl = `${otaWilmaApi}/config`;
        const createUrl = `${otaWilmaApi}/themes/create/${preset}`;
        const listUrl = `${otaWilmaApi}/themes/list`;

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
        const themeUrl = `${otaWilmaApi}/themes/get/${id}`;
        const configUrl = `${otaWilmaApi}/config`;
        const listUrl = `${otaWilmaApi}/themes/list`;
        const removeUrl = `${otaWilmaApi}/themes/${id}/remove`;

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

const editTheme = (auth, id, root, key, value) => {
    return new Promise(async (resolve, reject) => {
        const themeUrl = `${otaWilmaApi}/themes/get/${id}`;
        const themeList = `${otaWilmaApi}/themes/list`;
        const editUrl = `${otaWilmaApi}/themes/${id}/edit/${root}`;

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

const publish = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/publish`;

        fetchJson(url, {
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
            });
    });
}

/*
    NOTE API DOCUMENTATION
    calling this endpoint will only ever save user's selections if the 'updated' flag returns 'true'.
    user's selections will not be updated without consent. config flag 'public' must be
    true in order for the data to get stored on servers.
    [https://github.com/Project-OtaWilma/OtaWilma-API/blob/beta/database/public-api.js#L90]
*/

const fetchSelections = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/update-selections`;

        fetchJson(url, {
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
            });
    });
}

const generateToken = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/tokens/generate`;

        fetchJson(url, {
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
            });
    });
}


const invalidateToken = (auth, hash) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/tokens/invalidate/${hash}`;

        fetchJson(url, {
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
            });
    });
}

const useToken = (auth, hash) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/tokens/use/${hash}`;

        fetchJson(url, {
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
            });
    });
}

const listTokens = (auth) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/tokens/list`;

        fetchJson(url, {
            method: 'GET',
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
            });
    });
}

const fetchFriendSelections = (auth, hash) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/friends`;

        fetchJson(url, {
            method: 'GET',
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
            });
    });
}

const fetchApi = (auth, hash) => {
    return new Promise(async (resolve, reject) => {
        const url = `${otaWilmaApi}/public-api/get/${hash}`;

        fetchJson(url, {
            method: 'GET',
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
    editTheme,
    setTheme,
    publish,
    fetchSelections,
    generateToken,
    invalidateToken,
    listTokens,
    fetchApi,
    useToken,
    fetchFriendSelections
}