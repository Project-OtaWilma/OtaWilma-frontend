document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    })

    await loadTeachers();

    document.getElementById('loading').style.opacity = 0;
}

const loadTeachers = () => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('teacher-list');

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
                        loadTeacherInfo(e.target.id);
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
        console.log(name);

        fetchTeacherInfo(name)
        .then(info => {
            //
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
            
            const adjectiveTitle = document.getElementById('adjective-title');
            adjectiveTitle.innerHTML = `<strong>${info.feedback.reviews}</strong>`
            
            return resolve();
        })
        .catch(err => {
            return reject(err);
        })
    })
}