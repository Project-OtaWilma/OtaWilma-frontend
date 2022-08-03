document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    });

    await loadTeachers().catch(err => {
        displayError(err);
        throw err;
    });

    document.getElementById('loading').style.opacity = 0;
}

const loadTeachers = () => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('teacher-list');

        const openButton = document.getElementById('open-button');
        openButton.addEventListener('click', (e) => {
            console.log(e.target.getAttribute('data-hash'));
            window.open(`https://espoo.inschool.fi/profiles/teachers/${e.target.getAttribute('data-hash')}`);
        })

        const reviewButton = document.getElementById('review-button');
        reviewButton.addEventListener('click', () => {
            window.open('https://forms.gle/fuc3xM2Wuue7bEAu9')
        })

        fetchTeacherList()
        .then(list => {
            Object.keys(list).forEach(letter => {
                const divElement = document.createElement('div');
                
                const letterElement = document.createElement('h1');
                letterElement.textContent = letter;

                divElement.appendChild(letterElement);
                root.appendChild(divElement);

                list[letter].forEach(teacher => {
                    const teacherElement = document.createElement('div');
                    teacherElement.className = 'teacher';

                    const nameElement = document.createElement('h2');
                    nameElement.textContent = teacher.name;
                    nameElement.id = teacher.name;

                    nameElement.addEventListener('click', (e) => {
                        loadTeacherInfo(e.target.id).catch(err => {
                            displayError(err);
                        })
                    })

                    const taskElement = document.createElement('h3');
                    taskElement.textContent = teacher.task;
                    
                    teacherElement.appendChild(nameElement);
                    teacherElement.appendChild(taskElement);
                    divElement.appendChild(teacherElement);
                })
            });

            return resolve();
        })
        .catch(err => {
            return reject(err);
        })
    })
}

const loadTeacherInfo = (name) => {
    return new Promise((resolve, reject) => {

        fetchTeacherInfo(name)
        .then(info => {
            //
            const openButton = document.getElementById('open-button');
            openButton.setAttribute('data-hash', info.hash);

            const main = document.getElementById('main');
            main.style.display = 'flex';

            const tasks = info.task.replaceAll(' ja ', '/').replaceAll(', ', '/').split('/');
            
            const nameField = document.getElementById('name-field');
            nameField.textContent = info.name;
            
            const taskTitleElement = document.createElement('h2');
            taskTitleElement.textContent = tasks.length > 1 ? 'Tehtävät' : 'Tehtävä';
            
            const taskList = document.getElementById('task-list');
            taskList.replaceChildren(taskTitleElement);
            
            tasks.forEach(task => {
                const taskElement = document.createElement('h3');
                taskElement.textContent = task;
                
                taskList.appendChild(taskElement);
            });

            //
            const contactTitleElement = document.createElement('h2');
            contactTitleElement.textContent = 'Yhteystiedot'

            const contactDetails = document.getElementById('contact-info');
            contactDetails.replaceChildren(contactTitleElement);

            const nameArray = info.name.split(' ');
            const gmail = nameArray.length > 2 ? [[nameArray[0], nameArray[1]].join(''), nameArray[2]].join('.').toLowerCase()  + '@opetus.espoo.fi' : nameArray.join('.').toLowerCase() + '@opetus.espoo.fi'

            const gmailElement = document.createElement('h3');
            gmailElement.textContent = gmail;

            contactDetails.appendChild(gmailElement);
            
            //
            const commentTitleElement = document.createElement('h2');
            commentTitleElement.textContent = 'Julkiset kommentit';

            const commentList = document.getElementById('comments');
            commentList.replaceChildren(commentTitleElement);
            
            
            info.feedback.comments.forEach(comment => {
                const commentElement = document.createElement('h3');
                commentElement.textContent = comment;

                commentList.appendChild(commentElement);
            })

            //

            const adjectiveRoot = document.getElementById('adjective-list');
            adjectiveRoot.replaceChildren([])

            
            const adjectiveTitleElement = document.createElement('h1');
            adjectiveTitleElement.textContent = 'Opettajaa kuvaavat hyvin adjektiivit';
            
            const adjectiveLabel = document.createElement('h3');
            adjectiveLabel.innerHTML = `<strong>${info.feedback.reviews}</strong> opiskelijaa ovat arvioineet opettajaa
            <strong>${nameField.textContent}</strong> seuraavasti:`
            
            adjectiveRoot.appendChild(adjectiveTitleElement);
            adjectiveRoot.appendChild(adjectiveLabel);


            info.feedback['teacher-adjectives'].filter(a => a.percentage > 30).forEach(adjective => {
                const adjectiveElement = document.createElement('div');
                adjectiveElement.className = 'adjective';
                adjectiveElement.style.width = `${adjective.percentage}%`;

                const adjectiveField = document.createElement('h2');
                adjectiveField.textContent = adjective.adjective;

                const percentageField = document.createElement('h3');
                percentageField.textContent = `(${adjective.percentage.toFixed(0)}%)`;

                adjectiveElement.appendChild(adjectiveField);
                adjectiveElement.appendChild(percentageField);
                adjectiveRoot.appendChild(adjectiveElement);
            })

            //

            const keys = {
                'course-pace': {options: ['Hidas', 'Tavallinen', 'Nopea']},
                'course-applicability': {options: ['Perusteet', 'Tavallinen', 'Soveltava']},
                'course-difficulty': {options: ['Helppo', 'Tavallinen', 
            'Haastava']}
            }

            if(info.feedback.reviews > 1) {
                Object.keys(keys).forEach(key => {
                    document.getElementById(key).style.display = 'flex';
                    
                    document.getElementById(`${key}-label`).style.display = 'none';
                    const value = `display: flex; background: conic-gradient(var(--accent-main) 0deg ${info.feedback[key] * 180}deg, transparent 0deg);`
                    
                    if((info.feedback[key] * 180) <= 120) document.getElementById(`${key}-text`).textContent = keys[key].options[0];
                    if((info.feedback[key] * 180) > 120 && info.feedback[key] < 240) document.getElementById(`${key}-text`).textContent = keys[key].options[1];
                    if((info.feedback[key] * 180) >= 240) document.getElementById(`${key}-text`).textContent = keys[key].options[2];
                    
                    document.getElementById(`${key}-value`).style = value;
                });
                document.getElementById('card-title').style.display = 'inline';
            }
            else {
               Object.keys(keys).forEach(key => {
                    document.getElementById(key).style.display = 'none';
                    document.getElementById(`${key}-label`).style.display = 'flex';
                    document.getElementById(`${key}-value`).style.display = 'none';
                })
                document.getElementById('card-title').style.display = 'none';
            }

            
            return resolve();
        })
        .catch(err => {
            return reject(err);
        })
    })
}