document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const grades = {
    'S': 'Suoritettu',
    'O': 'Osallistunut',
    'K': 'Keskeytynyt',
    'P': 'Puuttuva suoritys',
    '0': 'Hylätty',
    '1': 'Välttävä',
    '2': 'Tyydyttävä',
    '3': 'Hyvä',
    '4': 'Hylätty',
    '5': 'Välttävä',
    '6': 'Kohtalainen',
    '7': 'Tyydyttävä',
    '8': 'Hyvä',
    '9': 'Kiitettävä',
    '10': 'Erinomainen'
}

const Initialize = async () => {
    InitializeNavBar();
    setupLops();

    await InitializeThemes();

    await setupBook('LOPS2021').catch(err => {
        displayError(err);
        throw err;
    })
    await loadBook().catch(err => {
        displayError(err);
        throw err;
    })

    document.getElementById('loading').style.opacity = 0;
}

const setupLops = () => {
    const list = [
        'LOPS2021',
        'LOPS2016'
    ]

    list.forEach(key => {
        const element = document.getElementById(key);

        element.addEventListener('click', () => {
            if (state.grades.current != key) {
                document.getElementById(state.grades.current).className = '';
                element.className = 'selected';
                state.grades.current = key;

                setupBook(key);
            }
        });
    })
}

const setupBook = (lops) => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('gradebook')

        const translations = {
            'OÄIun': 'Lukiokoulutusta täydentävä oma äidinkieli (unkari)',
            'OÄIve': 'Lukiokoulutusta täydentävä oma äidinkieli (venäjä)',
            'OÄIar': 'Lukiokoulutusta täydentävä oma äidinkieli (arabia)',
            'OÄIfa': 'Lukiokoulutusta täydentävä oma äidinkieli (farsi/dari)',
            'OÄIku': 'Lukiokoulutusta täydentävä oma äidinkieli (kurdi)',
            'OÄIma': 'Lukiokoulutusta täydentävä oma äidinkieli (mandariinikiina)',
            'OÄIso': 'Lukiokoulutusta täydentävä oma äidinkieli (somali)',
            'OÄIve': 'Lukiokoulutusta täydentävä oma äidinkieli (venäjä)'
        }

        fectchCourseList(lops)
            .then(list => {
                root.replaceChildren([]);

                Object.keys(list).forEach(subject => {
                    const subjectElement = document.createElement('div');
                    subjectElement.className = 'subject';

                    const ul = document.createElement('ul');

                    const key = document.createElement('a');
                    key.textContent = `${Object.keys(translations).includes(subject) ? translations[subject] : subject} `;

                    const value = document.createElement('a');
                    value.id = Object.keys(translations).includes(subject) ? translations[subject] : subject;

                    const courseList = document.createElement('div');
                    courseList.className = 'course-list';

                    ul.appendChild(key);
                    ul.appendChild(value);
                    subjectElement.appendChild(ul);
                    subjectElement.appendChild(courseList);

                    list[subject].forEach(course => {

                        const courseObject = document.createElement('div');
                        courseObject.className = course.type;
                        courseObject.id = course.code;

                        courseObject.addEventListener('click', (e) => {
                            loadCourse(e, course);
                        })

                        const code = document.createElement('h4');
                        code.textContent = course.code;

                        const infoObject = document.createElement('div');
                        infoObject.className = 'course-info';

                        const name = document.createElement('h2');
                        name.textContent = course.name;

                        courseObject.setAttribute('data-name', course.name);
                        courseObject.setAttribute('data-code', course.code);
                        courseObject.appendChild(code);

                        infoObject.appendChild(name);
                        courseObject.appendChild(infoObject);


                        courseList.appendChild(courseObject);
                    });

                    root.appendChild(subjectElement);
                    return resolve();
                });

            })
            .catch(err => {
                return reject(err);
            })
    })
}

const loadCourse = (e, course) => {
    const courseInfoRoot = document.getElementById('course-info');

    setLoadingScreen(true);

    return new Promise((resolve, reject) => {
        fetchCourse(state.grades.current, e.target.getAttribute('data-code'))
            .then(info => {
                delete info['name'];
                delete info['type'];

                info = {
                    ...{
                        'Arvosana': e.target.getAttribute('data-grade'),
                        'Suoritettu': e.target.getAttribute('data-date'),
                        'Opettaja': e.target.getAttribute('data-teacher'),
                        'Lisätietoja': e.target.getAttribute('data-info')
                    }, ...info
                }

                info['Opintopisteitä'] = e.target.getAttribute('data-points') ? e.target.getAttribute('data-points') : info['Opintopisteitä']

                courseInfoRoot.replaceChildren([]);

                const titleElement = document.createElement('h1');
                titleElement.textContent = `${course.code} - ${course.name}`;

                courseInfoRoot.appendChild(titleElement);

                Object.keys(info).forEach(key => {
                    if (info[key] && info[key] != 'null') {
                        const fieldElement = document.createElement('ul');


                        const keyElement = document.createElement('a');
                        keyElement.textContent = `${key}: `;

                        const valueElement = document.createElement('a');
                        valueElement.innerHTML = info[key];
                        valueElement.className = key;

                        fieldElement.appendChild(keyElement);
                        fieldElement.appendChild(valueElement);

                        courseInfoRoot.appendChild(fieldElement);
                    }
                });

                setLoadingScreen(false);
                return resolve();
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const loadBook = () => {
    return new Promise((resolve, reject) => {
        const overViewRoot = document.getElementById('overview')
        const overview = [
            'Lu21 pakollinen moduuli',
            'Lu21 valtakunnallinen valinnainen moduuli',
            'Lu21 paikallinen opintojakso',
            'Yhteensä',
            'Keskiarvo',
            'Lukuaineiden keskiarvo'
        ]

        fetchGradeBook('')
            .then(list => {
                overview.forEach(key => {
                    const ulElement = document.createElement('ul');
                    const keyElement = document.createElement('a');
                    keyElement.textContent = `${key} `;
                    const valueElement = document.createElement('a');
                    valueElement.textContent = list[key];

                    ulElement.appendChild(keyElement);
                    ulElement.appendChild(valueElement);
                    overViewRoot.appendChild(ulElement);
                    delete list[key];
                });


                Object.keys(list).forEach(s => {
                    const subject = list[s];

                    const gradeElement = document.getElementById(s);
                    if (gradeElement) {
                        gradeElement.textContent = subject.grade;

                        Object.keys(subject.courses).forEach(c => {
                            const course = subject.courses[c];
                            const courseElement = document.getElementById(course.code);

                            if (courseElement) {
                                courseElement.className = `${courseElement.className}-graded`
                                courseElement.setAttribute('data-grade', `${course.grade} - ${grades[course.grade]}`);
                                courseElement.setAttribute('data-points', course.points);
                                courseElement.setAttribute('data-date', course.date);
                                courseElement.setAttribute('data-teacher', course.teacher);
                                courseElement.setAttribute('data-info', course.info);

                                const textElement = courseElement.getElementsByTagName('h4')[0];
                                textElement.textContent = course.grade;
                            }

                        })
                    }
                })

                return resolve();
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const setLoadingScreen = (value) => {
    document.getElementById('course-loading-screen').style.display = value ? 'flex' : 'none';
    document.getElementById('course-info').style.filter = value ? 'blur(2px)' : 'none';
}