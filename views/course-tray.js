document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes();

    await InitializeTrayList();

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

                    console.log(period);
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
            periodElement.className = 'period';

            const titleElement = document.createElement('h1');
            titleElement.textContent = title;

            periodElement.appendChild(titleElement);
            root.appendChild(periodElement);

            Object.keys(period).forEach(b => {
                const bar = period[b];

                const barElement = document.createElement('div');
                barElement.className = 'bar';

                const barIndex = document.createElement('h2');
                barIndex.textContent = b;

                const courseList = document.createElement('h2');
                courseList.className = 'course-list';


                barElement.appendChild(barIndex);
                barElement.appendChild(courseList);
                periodElement.appendChild(barElement);

                
                bar.forEach(course => {
                    
                    const courseElement = document.createElement('div');
                    courseElement.className = course.class;
                    courseElement.textContent = course.code;
                    courseElement.id = course.hash;

                    courseElement.setAttribute('data-subject', course.subject);
                    courseElement.setAttribute('data-name', course.name);
                    courseElement.setAttribute('data-students', course.students);
                    courseElement.setAttribute('data-teacher', course.info.teacher);

                    const data = document.createElement('div');
                    data.className = 'course-data';

                    const nameElement = document.createElement('h2');
                    nameElement.textContent = course.name;

                    const teacherElement = document.createElement('h2');
                    teacherElement.textContent = course.teacher;

                    const statusElement = document.createElement('h2');
                    statusElement.textContent = course.students;


                    courseElement.addEventListener('click', (e) => {
                        loadCourseInfo(e.target.textContent, e.target.id);
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

const loadCourseInfo = (code, hash) => {
    return new Promise((resolve, reject) => {

        console.log([code])
        fetchTrayCourse(hash)
        .then(course => {
            console.log(course);
        })
        .catch(err => {
            return reject(err);
        })

        return resolve();
    });
}
