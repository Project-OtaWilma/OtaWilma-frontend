const fetchMessages = () => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400 });
        }

        fetch('http://localhost:3001/api/messages/inbox/?limit=20', {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err); })
                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: err })
                }
            })
            .catch(err => {
                return reject({ err: 'Failed to reach servers', err: err })
            })
    });
}

const fetchGradeBook = () => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400 });
        }

        fetch('http://localhost:3001/api/gradebook/?filter=courses', {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                switch (res.status) {
                    case 200:
                        const json = await res.json().catch(err => { return reject(err); })
                        return resolve(json);
                    case 400:
                        return reject({ err: 'Invalid request', error: err })
                }
            })
            .catch(err => {
                return reject({ err: 'Failed to reach servers', err: err })
            })
    });
}