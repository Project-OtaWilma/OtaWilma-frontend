
const Login = (credentials = { username: String, password: String }) => {
    return new Promise(async (resolve, reject) => {
        fetch('http://localhost:3001/api/login/', {
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

                        window.location = '/views/frontpage.html';
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

const createAccout = () => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/api/sessions/config/create',
        {
            method: 'POST'
        })
        .then(async (res) => {
            const json = await res.json();
    
            switch(res.status) {
                case 200:
                    const session = json['session'];
                    document.cookie = `session=${session}; SameSite=Lax; Secure;`;
                    return resolve();
            }
        })
    })
}



const Account = {
    Login,
    createAccout
}