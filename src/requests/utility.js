/*

    Contains all of the request-related utilities
        - fetchJson() for retrieving json-values with advanced caching capabilities
        - getCookie() for easy access to cookies
        - getParameterByName() for easy access
    
*/

const cacheAvailable = 'caches' in window;

const fetchJson = (url, options = {
    method: String,
    headers: {},
    cache: String,
    body: String
}) => {
    return new Promise(async (resolve, reject) => {

        if (cacheAvailable && options.cache) {
            const list = await loadCache(options.cache, url).catch(() => { });

            if (list) {
                console.warn(`Loaded response from "${options.cache}"`);
                return resolve(list);
            }
        }

        fetch(url, {
            method: options.method,
            headers: options.headers,
            body: options.body
        })
            .then(async (res) => {
                const json = await res.json().catch(() => { return reject({ err: 'Failed to parse response', error: json, status: 400 }) });

                switch (res.status) {
                    case 200:
                        if (cacheAvailable && options.cache) {
                            console.warn(`Cached response to "${options.cache}"`);
                            appendCache(options.cache, url);
                        }

                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: json, status: 400 })
                    case 401:
                        return reject({ err: 'Invalid credentials', error: json, status: 401, redirect: true })
                    case 500:
                        return reject({ err: "Internal server error", status: 500 })
                    case 501:
                        return reject({ err: "Failed to reach Wilma's servers", error: json, status: 501 })
                    default:
                        return reject({ err: 'Received an unexpected response from servers', status: res.status })
                }
            })
    });
}

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[[\]]/g, '\\$&');

    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

export {
    cacheAvailable,
    fetchJson,
    getParameterByName,
    getCookie,
    appendCache,
    loadCache,
    clearCache,
    removeCache
}