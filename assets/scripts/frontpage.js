document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();

    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    })
    
    await InitializeLayout().catch(err => {
        displayError(err);
        throw err;
    })
    
    document.getElementById('loading').style.opacity = 0;
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
                case 'NEWS':
                    await loadNews(key).catch(err => {
                        return reject(err);
                    });
                    state.config.frontpage['NEWS'] = key;
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


        fetchMessages('inbox', 10)
            .then(list => {

                list.forEach(message => {
                    const messageObject = document.createElement('div');
                    messageObject.className = 'message-object';
                    messageObject.id = message.id;

                    messageObject.addEventListener('click', () => {
                        window.location =`/views/messages.html?message=${messageObject.id}`;
                    });

                    const subject = document.createElement('h1');
                    subject.textContent = message.subject;

                    const timestamp = document.createElement('h4');
                    timestamp.textContent = message.timeStamp;

                    const sender = document.createElement('h4');
                    sender.textContent = message.senders[0].name;

                    const replies = document.createElement('h3');
                    replies.textContent = message.replies ? `${message.replies} ${message.replies == "1" ? 'vastaus' : 'vastausta'}` : '';

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

const loadNews = (key) => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById(key);

        const title = document.createElement('h1');
        title.textContent = 'Tiedotteet';

        const newsRoot = document.createElement('div');
        newsRoot.className = 'news';

        newsRoot.appendChild(title);
        root.appendChild(newsRoot);


        fetchNews('current', 10)
        .then(list => {
            Object.keys(list).forEach(date => {
                const news = list[date];

                news.forEach(n => {
                    const newsObject = document.createElement('div');
                    newsObject.className = 'news-object';
                    
                    const titleObject = document.createElement('h1');
                    titleObject.textContent = n.title;
                    titleObject.id = n.href;
                    titleObject.addEventListener('click', (e) => {
                        window.location = `/views/news.html?news=${e.target.id}`
                    })

                    const dateObject = document.createElement('h2');
                    dateObject.textContent = date;

                    const senderObject = document.createElement('h2');
                    senderObject.textContent = n.sender.name;

                    const descriptionObject = document.createElement('h3');
                    descriptionObject.textContent = n.description;

                    newsObject.appendChild(titleObject);
                    newsObject.appendChild(dateObject);
                    newsObject.appendChild(senderObject);
                    newsObject.appendChild(descriptionObject);
                    newsRoot.appendChild(newsObject);
                });

            });
        })
        .catch(err => {
            return reject(err);
        })

        return resolve();
    })
}

const loadSchedule = (key, date) => {
    return new Promise((resolve, reject) => {
        const dateTime = date ? date : new Date(2022, 7, 11);
        const dateString = dateTime.toLocaleDateString().split('/').reverse().join('-');
        const root = document.getElementById(key);
        
        fetch('../assets/static/schedule.html')
            .then(async (res) => {
                const html = await res.text();
                root.innerHTML = html;

                const clockSec = document.getElementById('clock-sec');
                const clockMin = document.getElementById('clock-min');
                const clockHour = document.getElementById('clock-hour');

                const currentTime = document.getElementById('current-time');

                setInterval(() => {
                    const d = new Date();
                    clockSec.style.transform = `rotate(${((d.getSeconds() / 60) * 360) + 180}deg)`;
                    clockMin.style.transform = `rotate(${((d.getMinutes() / 60) * 360) + ((d.getSeconds()/60)*6) + 180}deg)`;
                    clockHour.style.transform = `rotate(${((d.getHours() / 12) * 360) + ((d.getMinutes()/60)*30) + 180}deg)`;
                    currentTime.textContent = d.toLocaleTimeString();
                }, 1000);

                const dateForm = document.getElementById('date-form');
                dateForm.addEventListener('submit', (e) => e.preventDefault());

                const dateInput = document.getElementById('date-input');

                dateInput.value = dateString;

                dateInput.addEventListener('change', (e) => {
                    const d = e.target.value.split('-');

                    loadSchedule(state.config.frontpage['SCHEDULE'], new Date(d[0], d[1], d[2]))
                })

                const previousPage = document.getElementById('previous-week');
                previousPage.addEventListener('click', () => {
                    const d = dateInput.value.split('-').map(d => { return Number.parseInt(d); });

                    loadSchedule(state.config.frontpage['SCHEDULE'], new Date(d[0], (d[1] - 1), d[2] - 7))
                    dateInput.value = `${d[0]}-${d[1]}-${d[2] - 7}`
                });

                const nextPage = document.getElementById('next-week');
                nextPage.addEventListener('click', () => {
                    const d = dateInput.value.split('-').map(d => { return Number.parseInt(d); });

                    loadSchedule(state.config.frontpage['SCHEDULE'], new Date(d[0], (d[1] - 1), d[2] + 7))
                }); 

                fetchSchedule(dateTime)
                    .then(schedule => {
                        Object.keys(schedule).filter(s => schedule[s].day.id <= 5 && schedule[s].day.id >= 1).forEach(d => {
                            const date = schedule[d];
                            document.getElementById(`${date.day.id}.date`).textContent = date.day.caption;

                            date.lessons.forEach((lesson, i) => {
                                const slot = document.getElementById(lesson.slot);
                                slot.style.opacity = 1;

                                lesson.groups.forEach((group, i) => {
                                    
                                    if(slot) {

                                        const data = document.createElement('div');
                                        data.className = 'data';

                                        const name = document.createElement('h2');
                                        name.textContent = group.code;

                                        const teacher = document.createElement('h2');
                                        if(group.teachers) {
                                            teacher.textContent = group.teachers[0].caption;
                                        }

                                        const room = document.createElement('h2');

                                        if(group.rooms) {
                                            room.textContent = group.rooms[0].caption;
                                        }

                                        
                                        data.appendChild(teacher);
                                        data.appendChild(name);
                                        data.appendChild(room);
                                        slot.appendChild(data);
                                    }
                                    
                                });

                            })
                        })

                        return resolve();
                    })
                    .catch(err => {
                        return reject(err);
                    })
            })
            .catch(err => {
                return reject(err);
            })

        


    })
}