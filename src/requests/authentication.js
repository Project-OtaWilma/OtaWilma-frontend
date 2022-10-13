const api = 'http://localhost:3000/api';

const login = (credentials = {username: String, password: String}) => {
    return new Promise(((resolve, reject) => {
        const url = `${api}/account/login`;

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })
        .then(async (res) => {
            const json = await res.json();
            switch(res.status) {
                case 200:
                    return resolve(json);
                default:
                    return reject(json);
            }
        })
        .catch(err => {
            return reject(err);
        })
    }));
}

export {
    login
}