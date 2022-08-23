/*

    Contains all the Wilma-related requests. Requires "/assets/scripts/requests.js/"

*/


// const wilmaAPI = 'https://wilma-api.tuukk.dev/api/';
const wilmaAPI = 'http://localhost:3001/api/';

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
            return reject(err);
        })
    });
}

const fetchMessages = (path, limit) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}messages/${path}/?limit=${limit}`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(list => {
            return resolve(list);
        })
        .catch(err => {
            return reject(err);
        })
    });
}

const fetchMessageContent = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}messages/${hash}`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(content => {
            return resolve(content);
        })
        .catch(err => {
            return reject(err);
        });
    });
}

const fetchNews = (path, limit) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}/news/${path}?limit=${limit}`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(list => {
            return resolve(list);
        })
        .catch(err => {
            return reject(err);
        });
    });
}

const fetchNewsContent = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}news/${hash}`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(content => {
            return resolve(content);
        })
        .catch(err => {
            return reject(err);
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
            return reject(err);
        })
    })
}

const fetchGradeBook = (filter) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}gradebook/?filter=${filter}`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(grades => {
            return resolve(grades);
        })
        .catch(err => {
            return reject(err);
        });
    });
}

const fetchCourse = (lops, id) => {
    return new Promise(async (resolve, reject) => {
        const url = `${wilmaAPI}lops/${lops}/courses/get/${id}`;

        fetchJson(url, {
            method: 'GET',
            cache: 'course-cache'
        })
        .then(course => {
            return resolve(course);
        })
        .catch(err => {
            return reject(err);
        })
    })
}

const fetchSchedule = (date = Date) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}schedule/week/${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', status: 400 });
        if (!StudentID) return reject({ err: 'Missing StudentID', status: 400 });

        fetchJson(url, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
        .then(schedule => {
            return resolve(schedule);
        })
        .catch(err => {
            return reject(err);
        })
    })
}

const fetchTrayList = () => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}course-tray/list`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(list => {
            return resolve(list);
        })
        .catch(err => {
            return reject(err);
        });
    });
}

const fetchPeriod = (hash) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}course-tray/${hash}`;

        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', status: 400 });
        if (!StudentID) return reject({ err: 'Missing StudentID', status: 400 });

        fetchJson(url, {
            method: 'GET',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
        .then(period => {
            return resolve(period);
        })
        .catch(err => {
            return reject(err);
        })
    });
}

const fetchTrayCourse = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}course-tray/courses/${hash}`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(course => {
            return resolve(course);
        })
        .catch(err => {
            return reject(err);
        });
    });
}

const fetchTrayCourseInfo = (hash) => {
    return new Promise((resolve, reject) => {
        const Wilma2SID = getCookie('Wilma2SID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', error: 401, redirect: true });

        fetchJson(`${wilmaAPI}course-tray/courses/info/${hash}`,
        {
            headers: {'Wilma2SID': Wilma2SID}
        })
        .then(info => {
            return resolve(info);
        })
        .catch(err => {
            return reject(err);
        });
    });
}

const CourseTraySelect = (hash) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}course-tray/select/${hash}`;

        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', status: 400 });
        if (!StudentID) return reject({ err: 'Missing StudentID', status: 400 });

        fetchJson(url, {
            method: 'POST',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
        .then(status => {
            return resolve(status);
        })
        .catch(err => {
            return reject(err);
        })
    });
}

const CourseTrayDeselect = (hash) => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}course-tray/deselect/${hash}`;

        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', status: 400 });
        if (!StudentID) return reject({ err: 'Missing StudentID', status: 400 });

        fetchJson(url, {
            method: 'POST',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
        .then(status => {
            return resolve(status);
        })
        .catch(err => {
            return reject(err);
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
            return reject(err);
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
            return reject(err);
        })
        
    });
}

const logout = () => {
    return new Promise((resolve, reject) => {
        const url = `${wilmaAPI}logout`;

        const Wilma2SID = getCookie('Wilma2SID');
        const StudentID = getCookie('StudentID');

        if (!Wilma2SID) return reject({ err: 'Missing Wilma2SID', status: 400 });
        if (!StudentID) return reject({ err: 'Missing StudentID', status: 400 });

        fetchJson(url, {
            method: 'POST',
            headers: {
                Wilma2SID: Wilma2SID,
                StudentID: StudentID,
            }
        })
        .then(status => {
            return resolve(status);
        })
        .catch(err => {
            return reject(err);
        })
    });
}