document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();

    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    })

    /* Load layout afterwards to seemingly increase loading speeds */
    document.getElementById('loading').style.opacity = 0;

    await InitializeLayout().catch(err => {
        displayError(err);
        throw err;
    })


}

const InitializeLayout = () => {
    return new Promise(async (resolve, reject) => {
        const containers = [
            'main',
            'bottom-left',
            'bottom-right',
            'right-top',
            'right-bottom'
        ]

        for (let i = 0; i < containers.length; i++) {
            const key = containers[i];

            const type = state.config.frontpage[key];

            switch (type) {
                case 'MESSAGES':
                    await loadMessages(key).catch(err => {
                        return reject(err);
                    })
                    state.config.frontpage['MESSAGES'] = key;
                    break;
                case 'GRADES':
                    await loadGrades(key).catch(err => {
                        return reject(err);
                    })
                    state.config.frontpage['GRADES'] = key;
                    break;
                case 'SCHEDULE':
                    await loadSchedule(key).catch(err => {
                        return reject(err);
                    })
                    state.config.frontpage['SCHEDULE'] = key;
                    break;
            }
        }

        return resolve();
    });
}

const loadMessages = async (key) => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById(key);

        const messageRoot = document.createElement('div');
        messageRoot.className = 'messages';

        const h1 = document.createElement('h1');
        h1.textContent = 'Viestit';

        const h2 = document.createElement('h2');
        h2.textContent = 'Vanhat';

        messageRoot.appendChild(h1);
        messageRoot.appendChild(h2);

        root.appendChild(messageRoot);


        fetchMessages()
            .then(list => {
                list.forEach(message => {
                    const messageObject = document.createElement('div');
                    messageObject.className = 'message-object';
                    messageObject.id = message.Id;

                    messageObject.addEventListener('click', () => {
                        // TODO
                        console.log(messageObject.id);
                    });

                    const subject = document.createElement('h1');
                    subject.textContent = message.Subject;

                    const timestamp = document.createElement('h4');
                    timestamp.textContent = message.TimeStamp;

                    const sender = document.createElement('h4');
                    sender.textContent = message.Sender;

                    const replies = document.createElement('h3');
                    replies.textContent = message.Replies ? `${message.Replies} ${message.Replies == "1" ? 'vastaus' : 'vastausta'}` : '';

                    messageObject.appendChild(subject);
                    messageObject.appendChild(timestamp);
                    messageObject.appendChild(sender);
                    messageObject.appendChild(replies);

                    messageRoot.appendChild(messageObject);

                })

                return resolve();
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const loadGrades = (key) => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById(key);

        const gradeRoot = document.createElement('div');
        gradeRoot.className = 'grades';

        const h1 = document.createElement('h1');
        h1.textContent = 'Opinnot';

        const overviewRoot = document.createElement('div');
        overviewRoot.className = 'overview';

        gradeRoot.appendChild(h1);
        gradeRoot.appendChild(overviewRoot);

        root.appendChild(gradeRoot);

        const overview = [
            'Lu21 pakollinen moduuli',
            'Lu21 valtakunnallinen valinnainen moduuli',
            'Lu21 paikallinen opintojakso',
            'Yhteensä',
            'Keskiarvo',
            'Lukuaineiden keskiarvo'
        ]

        fetchGradeBook('courses')
            .then(list => {
                delete list['Teknologia']
                overview.forEach(c => {
                    const ul = document.createElement('ul');

                    const key = document.createElement('a');
                    key.textContent = `${c} `;

                    const value = document.createElement('a');
                    value.textContent = ` ${list[c]}`;
                    delete list[c];

                    ul.appendChild(key);
                    ul.appendChild(value);

                    overviewRoot.appendChild(ul);
                });

                Object.keys(list).forEach(subject => {
                    const gradeObject = document.createElement('div');
                    gradeObject.className = 'grade-object';

                    const subjectElement = document.createElement('h1');
                    subjectElement.textContent = subject;

                    const gradeUl = document.createElement('ul');

                    const gradeKey = document.createElement('a');
                    gradeKey.textContent = 'Arvosana ';

                    const gradeValue = document.createElement('a');
                    gradeValue.textContent = list[subject].grade;

                    const etcsUl = document.createElement('ul');

                    const etcsKey = document.createElement('a');
                    etcsKey.textContent = 'Laajuus ';

                    const etcsValue = document.createElement('a');
                    etcsValue.textContent = list[subject].points;


                    gradeObject.appendChild(subjectElement);

                    gradeUl.appendChild(gradeKey);
                    gradeUl.appendChild(gradeValue);
                    gradeObject.appendChild(gradeUl);

                    etcsUl.appendChild(etcsKey);
                    etcsUl.appendChild(etcsValue);
                    gradeObject.appendChild(etcsUl);


                    gradeRoot.appendChild(gradeObject);
                })

                return resolve()

            })
            .catch(err => {
                return reject(err);
            })

    })
}

const loadSchedule = (key, date) => {
    return new Promise((resolve, reject) => {
        const dateTime = date ? date : { dd: 11, mm: 8, yyyy: 2022 };

        console.log(dateTime);

        const root = document.getElementById(key);

        fetch('../assets/static/schedule.html')
            .then(async (res) => {
                const html = await res.text();
                root.innerHTML = html;

                const input = document.getElementById('date-input');

                input.addEventListener('change', (e) => {
                    const d = e.target.value.split('-');
                    const key = state.config.frontpage['SCHEDULE'];

                    loadSchedule(key, { dd: d[2], mm: d[1], yyyy: d[0] })
                })


                fetchSchedule(dateTime)
                    .then(schedule => {

                        Object.keys(schedule).forEach(key => {
                            console.log(key);
                            const slot = document.getElementById(key);
                            slot.style.display = 'flex';

                            const hour = schedule[key];



                            hour.forEach(group => {
                                console.log(group);
                                const data = document.createElement('div');
                                data.className = 'data';


                                const groupInfo = document.createElement('div')
                                groupInfo.className = 'group-info';

                                const duration = document.createElement('h1');
                                duration.textContent = group.duration;

                                const name = document.createElement('h2');
                                name.textContent = group.name;

                                const teacherFull = document.createElement('h3');
                                teacherFull.textContent = group.teacher[0].name;

                                groupInfo.appendChild(duration);
                                groupInfo.appendChild(name);
                                groupInfo.appendChild(teacherFull);
                                data.appendChild(groupInfo);

                                const code = document.createElement('h2');
                                code.textContent = group.code;

                                const teacher = document.createElement('h3');
                                teacher.textContent = group.teacher[0].code;

                                const room = document.createElement('h3');
                                room.textContent = group.room;

                                data.appendChild(code);
                                data.appendChild(teacher);
                                data.appendChild(room);
                                slot.appendChild(data);
                            })
                        })

                        return resolve();
                    })
                    .catch(err => {
                        return reject(err);
                    })
            })


    })
}