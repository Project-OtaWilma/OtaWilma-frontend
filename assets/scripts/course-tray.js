document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    })

    await InitializeTrayList().catch(err => {
        displayError(err);
        throw err;
    })

    setupSearch();
    setupFilters();

    document.getElementById('loading').style.opacity = 0;
}

const InitializeTrayList = () => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('tray-list');

        fetchTrayList()
        .then(list => {
            Object.keys(list.own).forEach(title => {
                console.log(title);

                const trayObject = document.createElement('h1');
                trayObject.className = 'tray';

                const h1 = document.createElement('h1');
                h1.textContent = title;

                const listObject = document.createElement('div');
                listObject.className = 'period-list';


                trayObject.appendChild(h1);
                trayObject.appendChild(listObject);
                root.appendChild(trayObject);

                list.own[title].forEach(period => {
                    const periodElement = document.createElement('h2');
                    periodElement.textContent = period.name;
                    periodElement.id = period.href;

                    periodElement.addEventListener('click', (e) => {
                        loadPeriod(e.target.id, e.target.textContent);
                    })

                    listObject.appendChild(periodElement);
                })
            })
            return resolve();
        })
        
    });
}

const loadPeriod = (hash, title) => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('tray-main');

        fetchPeriod(hash)
        .then(period => {

            const periodElement = document.createElement('div');
            periodElement.className = 'period open';

            const titleElement = document.createElement('h1');
            titleElement.textContent = title;

            const actionContainer = document.createElement('div');
            actionContainer.className = 'period-actions';

            const hideButton = document.createElement('button');
            hideButton.className = 'hide-period';

            const textElement = document.createElement('h6');
            textElement.className = 'open';

            hideButton.addEventListener('click', () => {
                textElement.className = textElement.className == 'closed' ? 'open' : 'closed';
                periodElement.className = periodElement.className == 'period closed' ? 'period open' : 'period closed';

                
            })

            const disableButton = document.createElement('button');
            disableButton.className = 'disable-period';

            disableButton.addEventListener('click', () => {
                periodElement.remove();
                setupFilters();
            })

            hideButton.appendChild(textElement);

            actionContainer.appendChild(hideButton);
            actionContainer.appendChild(disableButton);

            periodElement.appendChild(titleElement);
            periodElement.appendChild(actionContainer);
            root.appendChild(periodElement);

            period.forEach(bar => {

                const barElement = document.createElement('div');
                barElement.className = 'bar';

                const barIndex = document.createElement('h2');
                barIndex.textContent = bar.title;

                const courseList = document.createElement('h2');
                courseList.className = 'course-list';

                barElement.appendChild(barIndex);
                barElement.appendChild(courseList);
                periodElement.appendChild(barElement);

                
                bar.courses.forEach(course => {
                    
                    const courseElement = document.createElement('div');
                    courseElement.className = course.class;
                    courseElement.textContent = course.code;
                    courseElement.id = course.hash;

                    courseElement.setAttribute('data-code', course.code);
                    courseElement.setAttribute('data-selected', course.class.includes('on'));
                    courseElement.setAttribute('data-subject', course.subject);
                    courseElement.setAttribute('data-name', course.name);
                    courseElement.setAttribute('data-teacher', course.info.teacher);

                    const data = document.createElement('div');
                    data.className = 'course-data';

                    const nameElement = document.createElement('h2');
                    nameElement.textContent = course.name;

                    const teacherElement = document.createElement('h2');
                    teacherElement.textContent = course.info.teacher;

                    const statusElement = document.createElement('h2');
                    if(course.info.locked) statusElement.textContent = 'Kurssi on lukittu'; 
                    if(course.info.full) statusElement.textContent = 'Kurssi on jo täynnä'; 

                    courseElement.addEventListener('click', (e) => {
                        loadCourseInfo(
                            e.target.getAttribute('data-code'),
                            e.target.getAttribute('data-name'),
                            e.target.getAttribute('data-selected'),
                            e.target.id);
                    })

                    data.appendChild(nameElement);
                    data.appendChild(teacherElement);
                    data.appendChild(statusElement);


                    courseElement.appendChild(data);
                    courseList.appendChild(courseElement);
                })
            })
        })
        .catch(err => {
            return reject(err);
        })

    });
}

const loadCourseInfo = (code, name, selected, hash) => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('course-info');
        root.replaceChildren([]);
        
        fetchTrayCourse(hash)
        .then(course => {
            const nameElement = document.createElement('h1');
            nameElement.textContent = name;

            const codeElement = document.createElement('h3');
            codeElement.textContent = code;

            root.appendChild(nameElement);
            root.appendChild(codeElement);

            const studentsUl = document.createElement('ul');
            const studentsKey = document.createElement('a');
            studentsKey.textContent = 'Ilmottautuneita: ';
            const studentsValue = document.createElement('a');
            studentsValue.textContent = '...';
            
            studentsUl.appendChild(studentsKey);
            studentsUl.appendChild(studentsValue);
            root.appendChild(studentsUl);

            Object.keys(course).forEach(key => {
                const value = course[key];
                
                const cUl = document.createElement('ul');
                const cKey = document.createElement('a');
                cKey.textContent = `${key}: `;

                const cValue = document.createElement('a');
                cValue.textContent = value;
                cValue.className = key;
                
                cUl.appendChild(cKey);
                cUl.appendChild(cValue);
                root.appendChild(cUl);
            });

            const actionButton = document.createElement('button');
            actionButton.className = 'course-action';
            actionButton.id = hash;
            actionButton.textContent = selected == 'true' ? 'Poista valinta' : 'Valitse kurssi';

            actionButton.addEventListener('click', (e) => {
                switch(selected) {
                    case 'true':
                        console.log('Poistit valinan: ' + code)
                        deselectCourse(e, hash);
                        break;
                    case 'false':
                        console.log('Valitsit kurssin: ' + code)
                        selectCourse(e, hash);
                        break;
                }
            })

            root.appendChild(actionButton);

            fetchTrayCourseInfo(hash)
            .then(info => {
                studentsValue.textContent = info.students;
            })
            .catch(err => {
                return reject(err);
            })
        })
        .catch(err => {
            return reject(err);
        })

        return resolve();
    });
}

const setupSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchCourse(searchInput.value);
    })
}

const searchCourse = (search) => {
    const resultField = document.getElementById('search-error');
    const s = {
        total: 0,
        unavailable: [],
        available: [],
        selected: []
    }

    Array.from(document.querySelectorAll(`[data-matched="true"]`)).forEach(e => {
        e.className = e.className.replace(' matched', '');
    })

    const r = document.querySelectorAll(`[data-code*="${search}"]`);

    if(r.length < 1) {
        resultField.textContent = 'Hakusi ei tuottanut tuloksia';
        return;
    }

    
    r.forEach(e => {
        const code = e.getAttribute('data-code');

        if(e.className.includes('disa')) {
            if(!s.unavailable.includes(code)) {
                s.unavailable.push(code);
                s.total++;
            }
        }
        else {
            if(!s.available.includes(code)) {
                s.available.push(code);
                s.total++;
            } 
        }

        if(e.getAttribute('data-selected') == 'true') {
            if(!s.selected.includes(code)) s.selected.push(code);
        }

        e.className += ' matched';
        e.setAttribute('data-matched', true);
    })
    
    resultField.innerHTML = `
    <ul><a>Haku: </a><a>${s.total} ${s.total > 1 ? 'tulosta' : 'tulos'}</a></ul>
    <ul><a>Saatavilla: </a><a>${s.available.length} / ${s.unavailable.length} </a><a>(${((s.available.length / s.total) * 100).toFixed(2)}%)</a></ul>
    <ul><a>Valittuna: </a><a>${s.selected.length}  ${s.selected.length > 0 ? `${s.selected.length > 1 ? 'kurssia' : 'kurssi'}` : ''}</a></ul>`
}

const setupFilters = () => {
    const filterButton = document.getElementById('filter-button');
    const subjectFilter = document.getElementById('filter-subject');
    subjectFilter.replaceChildren([]);
    state.filters.subjects = [];

    const lopsFilter = document.getElementById('filter-lops');
    const teacherFilter = document.getElementById('filter-teachers');
    teacherFilter.replaceChildren([]);
    state.filters.teachers = [];

    const allSubjectsOption = document.createElement('option');
    allSubjectsOption.textContent = 'Kaikki';
    allSubjectsOption.value = '';

    subjectFilter.appendChild(allSubjectsOption);

    const allTeachersOption = document.createElement('option');
    allTeachersOption.textContent = 'Kaikki';
    allTeachersOption.value = '';

    teacherFilter.appendChild(allTeachersOption);

    
    subjectFilter.addEventListener('click', (e) => {
        loadSubjects();
    });

    teacherFilter.addEventListener('click', (e) => {
        loadTeachers();
    });
    
    filterButton.addEventListener('click', (e) => {
        filterCourses(subjectFilter.value);
        filterLops(lopsFilter.value);
        filterTeacher(teacherFilter.value);
    });
}

const loadSubjects = () => {
    const root = document.getElementById('filter-subject');
    
    Array.from(document.querySelectorAll(`[data-subject]`)).forEach(e => {
        const subject = e.getAttribute('data-subject');
        if(!state.filters.subjects.includes(subject)) {
            state.filters.subjects.push(subject);
            
            const option = document.createElement('option');
            option.textContent = subject;
            option.value = subject;
            root.appendChild(option);
        }
    })
}

const loadTeachers = () => {
    const root = document.getElementById('filter-teachers');

    Array.from(document.querySelectorAll(`[data-subject]`)).forEach(e => {
        const teacher = e.getAttribute('data-teacher');
        
        if(teacher != 'null') {
            if(!state.filters.teachers.includes(teacher)) {
                state.filters.teachers.push(teacher);
                
                const option = document.createElement('option');
                option.textContent = teacher;
                option.value = teacher;
                root.appendChild(option);
            }
        }
        
        
    })
}

const filterCourses = (subject) => {
    Array.from(document.querySelectorAll(`[data-filtered-subject="true"]`)).forEach(e => {
        e.className = e.className.replace(' filtered subject', '');
    })

    if(subject == "") return;

    const r = document.querySelectorAll(`[data-subject]:not([data-subject="${subject}"])`);

    r.forEach(e => {
        e.className += ' filtered subject';
        e.setAttribute('data-filtered-subject', true);
    });
}

const filterLops = (lops) => {
    Array.from(document.querySelectorAll(`[data-filtered-lops="true"]`)).forEach(e => {
        e.className = e.className.replace(' filtered lops', '');
    })

    if(lops == "") return;

    const r = document.querySelectorAll(`${lops != 'L2021' ? '[data-subject]:not([data-subject*="w"])' : '[data-code*="w"]'}`);

    r.forEach(e => {
        e.className += ' filtered lops';
        e.setAttribute('data-filtered-lops', true);
    });
}

const filterTeacher = (teacher) => {
    Array.from(document.querySelectorAll(`[data-filtered-teacher="true"]`)).forEach(e => {
        e.className = e.className.replace(' filtered teacher', '');
    })

    if(teacher == "") return;

    const r = document.querySelectorAll(`[data-teacher]:not([data-teacher="${teacher}"])`);

    r.forEach(e => {
        e.className += ' filtered teacher';
        e.setAttribute('data-filtered-teacher', true);
    });
}

const selectCourse = (e, hash) => {
    const root = document.getElementById('course-info');
    const courseObject = document.getElementById(hash);

    CourseTraySelect(hash)
    .then(status => {
        console.log(status);
        if(courseObject) {
            courseObject.className = courseObject.className.replace('off', 'on');
            courseObject.setAttribute('data-selected', 'true');
            root.replaceChildren([]);
        }
        else {
            location.reload();
        }
    })
    .catch(err => {
        switch(err.status) {
            case 303:
                displayCourseError(err);
                break;
            default:
                throw err;
        }
    })

}

const deselectCourse = (e, hash) => {
    const root = document.getElementById('course-info');
    const courseObject = document.getElementById(hash);

    CourseTrayDeselect(hash)
    .then(status => {
        console.log(status);
        if(courseObject) {
            courseObject.className = courseObject.className.replace('on', 'off');
            courseObject.setAttribute('data-selected', 'false');
            root.replaceChildren([]);
        }
        else {
            location.reload();
        }
    })
    .catch(err => {
        switch(err.status) {
            case 303:
                displayCourseError(err);
                break;
            default:
                throw err;
        }
    })

}

const displayCourseError = (err) => {
    const root = document.getElementById('error-popup');
    root.style.opacity = 1;
    const details = document.getElementById('error-details')
    details.textContent = err.error.message.replace('srvError(', '').replace(');', '');

    setTimeout(() => {
        root.style.opacity = 0;
    }, 2500);
}
