const fetchTheme = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(async (res) => {
            const json = await res.json().catch(err => {return reject(err)});
            return resolve(json);
        })
        .catch(err => {
            return reject(err);
        })
    });
}

const loadTheme = (theme) => {
    const root = document.documentElement;
    const keys = Object.keys(theme);

    keys.forEach(key => {
        root.style.setProperty(key, theme[key]);
    });
}