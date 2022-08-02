const Login = (credentials = { username: String, password: String }) => {
    return new Promise(async (resolve, reject) => {
        fetch('https://wilma-api.tuukk.dev/api/login/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        const Wilma2SID = json['Wilma2SID'];
                        const StudentID = json['studentID'];

                        document.cookie = `Wilma2SID=${Wilma2SID}; SameSite=Lax; Secure;`;
                        document.cookie = `StudentID=${StudentID}; SameSite=Lax; Secure;`;

                        return resolve();
                    case 401:
                        return reject({ err: json.err })
                    case 400:
                        return reject({ err: json.err })
                }
            })
            .catch(err => {
                return reject({ err: 'failed to reach servers', status: 503 });
            })
    })
}

const loginToSession = (username) => {
    return new Promise(async (resolve, reject) => {
        const session = getCookie('session');
        const url = `${otaWilmaAPi}/sessions/config/login`;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hash: session, "username": username })
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
                return reject({ err: "Failed to reach servers (OtaWilma-API)", status: 503 })
            })
    });
}

const validateOtaWilmaAccount = (hash) => {
    return new Promise((resolve, reject) => {
        fetch(`https://otawilma-api.tuukk.dev/api/sessions/config/get/${hash}`)
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve();
                    case 400:
                        return reject({ err: 'Invalid session identifier', status: 400 })
                }
            })
            .catch(err => {
                return reject({ err: 'Failed to reach servers', status: 503 });
            })
    });
}

const createAccout = (username) => {
    return new Promise((resolve, reject) => {
        fetch('https://otawilma-api.tuukk.dev/api/sessions/config/create',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": username })
            })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        console.log(json);
                        const session = json['session']['hash'];
                        console.log(session);
                        document.cookie = `session=${session}; SameSite=Lax; Secure; max-age=31536000; path=/`;;
                        return resolve();
                    default:
                        return reject({ err: 'Failed to create OtaWilma account', error: json, status: 500 })
                }
            })
            .catch(err => {
                console.log(err);
                return reject({ err: 'Failed to reach servers', status: 503 });
            })
    })
}



const Account = {
    Login,
    loginToSession,
    validateOtaWilmaAccount,
    createAccout
}