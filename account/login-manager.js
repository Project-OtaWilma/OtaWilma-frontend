
const Login = (credentials = { username: String, password: String }) => {
    return new Promise(async (resolve, reject) => {
        fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(credentials)
        })
        .then(async (res) => {
            const json = await res.json().catch(err => { return reject(err) });

            if(json.err) {
                return reject({error: json.err, details: res.status});
            }

            if(json.session) {
                console.log(json.session);
                document.cookie = `Wilma2SID=${json.session}`;
                return resolve(true);
            }
        })
        .catch(err => {
            return reject({error: 'failed to reach servers', details: err});
        })
    })
}




const Account = {
    Login,

}