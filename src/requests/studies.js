const api = 'http://localhost:3000/api';

const fetchStudiesTrending = () => {
    return new Promise(((resolve, reject) => {
        const url = `${api}/studies/trending`;
        console.log('fetching...');
        fetch(url, {
            method: 'GET'
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

const fetchStudiesStarred = (auth) => {
    return new Promise(((resolve, reject) => {
        const url = `${api}/studies/starred`;
        console.log('fetching...');
        fetch(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
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

const fetchStudiesRecent = (auth) => {
    return new Promise(((resolve, reject) => {
        const url = `${api}/studies/recent`;
        console.log('fetching...');
        fetch(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
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

const fetchStudy = (auth, hash) => {
    return new Promise(((resolve, reject) => {
        const url = `${api}/studies/get/${hash}`;
        const headers = {};

        if(auth) headers['token'] = auth;

        fetch(url, {
            method: 'GET',
            headers: headers
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
    fetchStudiesTrending,
    fetchStudiesStarred,
    fetchStudiesRecent,
    fetchStudy
}