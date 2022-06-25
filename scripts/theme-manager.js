const fetchConfig = () => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');
        console.log(session);
        if (!session) {
            return reject({ err: "Couldn't locate session identifier" });
        }

        fetch(`http://localhost:3000/api/sessions/config/get/${session}`)
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err) });
                        return resolve(json);
                    case 400:

                        return reject({ err: "Invalid session identifier", error: res.status })
                    default:
                        return reject({ err: "Couldn't reach servers", error: res.status })
                }
            })
            .catch(err => {
                return reject({ err: "Couldn't reach servers (config)", error: err })
            })
    });
}


const fetchTheme = (id) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        fetch(`http://localhost:3000/api/themes/get/${session}/${id}`)
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err) });
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    default:
                        return reject({ err: "Couldn't reach servers (theme)", error: res.status })
                }
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const fetchThemeList = () => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');

        fetch(`http://localhost:3000/api/themes/list/${session}`)
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err) });
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    default:
                        return reject({ err: "Couldn't reach servers (list)", error: res.status })
                }
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const setTheme = (id) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');
        fetch(`http://localhost:3000/api/sessions/config/current-theme/set/${session}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "theme": id
            })

        })
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err) });
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    default:
                        return reject({ err: "Couldn't reach servers", error: res.status })
                }
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const editThemeColors = (id, key, value) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');
        fetch(`http://localhost:3000/api/themes/edit/colors/${session}/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "key": key,
                "value": value
            })

        })
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err) });
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    default:
                        return reject({ err: "Couldn't reach servers", error: res.status })
                }
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const editThemeBackground = (id, key, value) => {
    return new Promise((resolve, reject) => {
        const session = getCookie('session');
        fetch(`http://localhost:3000/api/themes/edit/background/${session}/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "key": key,
                "value": value
            })

        })
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err) });
                        return resolve(json);
                    case 400:
                        return reject({ err: "Invalid session identifier", error: res.status })
                    default:
                        return reject({ err: "Couldn't reach servers", error: res.status })
                }
            })
            .catch(err => {
                return reject(err);
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

