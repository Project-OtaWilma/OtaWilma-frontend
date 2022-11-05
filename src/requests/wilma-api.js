import {
    fetchJson,
    getCookie,
    clearCache,
    loadCache,
    appendCache
} from './utility'


//const wilmaAPI = 'https://wilma-api.tuukk.dev/api/';
const wilmaAPI = 'http://localhost:3001/api/';

const login = (credentials) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}login`;

        fetchJson(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    });
}

const getVersion = () => {
    return new Promise(async (resolve, reject) => {
        const url = `${wilmaAPI}version/get`;
        const cached = await loadCache('version-cache', url).catch(() => { });
        const version = cached ? cached.version : null;

        fetchJson(url,
            {
                method: 'GET'
            })
            .then(async (res) => {
                if (version == res.version) return resolve({ version: res.version, updated: false })

                await clearCache('theme-cache');
                await clearCache('config-cache');
                await clearCache('course-cache');
                await clearCache('version-cache');

                appendCache('version-cache', url);;

                return resolve({ version: res.version, updated: true });
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    });
}

const fetchMessages = (auth, path, limit) => {
    return new Promise((resolve, reject) => {
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}messages/${path}/?limit=${limit}`,
            {
                headers: { 'token': auth }
            })
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    });
}

const fetchMessageContent = (auth, hash) => {
    return new Promise((resolve, reject) => {
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}messages/${hash}`,
            {
                headers: { 'token': auth }
            })
            .then(content => {
                return resolve(content);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            });
    });
}

const fetchNews = (auth, path, limit) => {
    return new Promise((resolve, reject) => {
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}/news/${path}?limit=${limit}`,
            {
                headers: { 'token': auth }
            })
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            });
    });
}

const fetchNewsContent = (auth, hash) => {
    return new Promise((resolve, reject) => {
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}news/${hash}`,
            {
                headers: { 'token': auth }
            })
            .then(content => {
                return resolve(content);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            });
    });
}

const fectchCourseList = (lops) => {
    return new Promise(async (resolve, reject) => {
        const url = `${wilmaAPI}lops/${lops}/courses/list`;

        fetchJson(url, {
            method: 'GET',
            cache: 'course-cache'
        })
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    })
}

const fetchGradeBook = (auth, filter) => {
    return new Promise((resolve, reject) => {
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}gradebook/?filter=${filter}`,
            {
                headers: { 'token': auth }
            })
            .then(grades => {
                return resolve(grades);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            });
    });
}

const fetchCourse = (lops, id) => {
    return new Promise(async (resolve, reject) => {
        // override to using stable api
        // const wilmaAPI = 'https://wilma-api.tuukk.dev/api/';
        const url = `${wilmaAPI}lops/${lops}/courses/get/${id}`;

        fetchJson(url, {
            method: 'GET',
            cache: 'course-cache'
        })
            .then(course => {
                return resolve(course);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    })
}

const fetchSchedule = (auth, date = Date) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}schedule/week/${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
        })
            .then(schedule => {
                return resolve(schedule);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    })
}

const fetchTrayList = (auth) => {
    return new Promise((resolve, reject) => {
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}course-tray/list`,
            {
                headers: { 'token': auth }
            })
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            });
    });
}

const fetchPeriod = (auth, hash) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}course-tray/${hash}`;

        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(url, {
            method: 'GET',
            headers: {
                'token': auth
            }
        })
            .then(period => {
                return resolve(period);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    });
}

const fetchTrayCourse = (hash) => {
    return new Promise((resolve, reject) => {
        const auth = getCookie('token');
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}course-tray/courses/${hash}`,
            {
                headers: { 'token': auth }
            })
            .then(course => {
                return resolve(course);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            });
    });
}

const fetchTrayCourseInfo = (hash) => {
    return new Promise((resolve, reject) => {
        const auth = getCookie('token');
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}course-tray/courses/info/${hash}`,
            {
                headers: { 'token': auth }
            })
            .then(info => {
                return resolve(info);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            });
    });
}

const CourseTraySelect = (hash) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}course-tray/select/${hash}`;

        const auth = getCookie('token');
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(url, {
            method: 'POST',
            headers: {
                'token': auth
            }
        })
            .then(status => {
                return resolve(status);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    });
}

const CourseTrayDeselect = (hash) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}course-tray/deselect/${hash}`;

        const auth = getCookie('token');
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(url, {
            method: 'POST',
            headers: {
                'token': auth
            }
        })
            .then(status => {
                return resolve(status);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    });
}

const fetchTeacherList = () => {
    return new Promise(async (resolve, reject) => {
        const url = `${wilmaAPI}teachers/list`;

        fetchJson(url, {
            method: 'GET',
            cache: 'teacher-cache'
        })
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    })
}

const fetchTeacherInfo = (value, isID) => {
    return new Promise((resolve, reject) => {
        const url = isID ? `${wilmaAPI}teachers/id/${value}` : `${wilmaAPI}teachers/name/${value}`;

        fetchJson(url, {
            method: 'GET'
        })
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })

    });
}

const logout = () => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}logout`;

        const auth = getCookie('token');
        if (!auth) return reject({ err: 'Missing authentication', error: 401, redirect: true });

        fetchJson(url, {
            method: 'POST',
            headers: {
                'token': auth
            }
        })
            .then(status => {
                return resolve(status);
            })
            .catch(err => {
                return reject(JSON.stringify(err));
            })
    });
}

export {
    login,
    logout,
    fetchMessages,
    fetchMessageContent,
    fetchGradeBook,
    fetchNews,
    fetchNewsContent,
    fetchSchedule,
    fectchCourseList,
    fetchCourse,
    fetchTrayList,
    fetchPeriod
}