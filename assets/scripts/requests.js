const fetchMessages = (path, limit) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });
        }

        fetch(`http://localhost:3001/api/messages/${path}/?limit=${limit}`, {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchMessageContent = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });
        }

        fetch(`http://localhost:3001/api/messages/${hash}`, {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchNews = (path, limit) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });
        }

        fetch(`http://localhost:3001/api/news/${path}?limit=${limit}`, {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchNewsContent = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });
        }

        fetch(`http://localhost:3001/api/news/${hash}`, {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchGradeBook = (filter) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        fetch(`http://localhost:3001/api/gradebook/?filter=${filter}`, {
            headers: {
                'Wilma2SID': Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fectchCourseList = () => {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3001/api/lops/courses/list';
        
        if(cacheAvailable) {
            loadCache('course-cache', url)
            .then(theme => {
                console.warn('Loaded course-list from cache')
                return resolve(theme);
            })
            .catch(() => {})
        }

        fetch(url, {
            method: 'GET'
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
                        appendCache('course-cache', url);
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    })
}

const fetchCourse = (id) => {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3001/api/lops/courses/get/${id}`;
        
        if(cacheAvailable) {
            loadCache('course-cache', url)
            .then(theme => {
                console.warn('Loaded course from cache')
                return resolve(theme);
            })
            .catch(() => {})
        }

        fetch(url, {
            method: 'GET'
        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
                        appendCache('course-cache', url)
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    })
}

const fetchSchedule = (date = Date) => {
    return new Promise((resolve, reject) => {

        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', status: 400 });
        }

        if (!StudentID) {
            return reject({ err: 'Missing StudentID', status: 400 });
        }

        fetch(`http://localhost:3001/api/schedule/week/${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
            .then(async (res) => {
                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                console.log(err);
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    })
}

const fetchTrayList = () => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        fetch(`http://localhost:3001/api/course-tray/list`, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchPeriod = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        if (!StudentID) {
            return reject({ err: 'Missing StudentID', status: 400 });
        }



        fetch(`http://localhost:3001/api/course-tray/${hash}`, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchTrayCourse = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');
        const url = `http://localhost:3001/api/course-tray/courses/${hash}`;

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        fetch(url, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID,
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const fetchTrayCourseInfo = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        fetch(`http://localhost:3001/api/course-tray/courses/info/${hash}`, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID,
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const CourseTraySelect = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        if (!StudentID) {
            return reject({ err: 'Missing StudentID', status: 400 });
        }



        fetch(`http://localhost:3001/api/course-tray/select/${hash}`, {
            method: 'POST',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 303:
                        return reject({err: 'Failed to perform action', error: json, status: 303});
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const CourseTrayDeselect = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) {
            return reject({ err: 'Missing Wilma2SID', error: 400, redirect: true });
        }

        if (!StudentID) {
            return reject({ err: 'Missing StudentID', status: 400 });
        }



        fetch(`http://localhost:3001/api/course-tray/deselect/${hash}`, {
            method: 'POST',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
            .then(async (res) => {

                const json = await res.json();

                switch (res.status) {
                    case 200:
                        return resolve(json);
                    case 303:
                        return reject({err: 'Failed to perform action', error: json, status: 303});
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
            .catch(err => {
                return reject({ err: 'Failed to reach servers (Wilma-API)', status: 503 })
            })
    });
}

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');

    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}