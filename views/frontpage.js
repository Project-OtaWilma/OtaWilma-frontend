document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const defaults = ['light', 'dark'];

const state = {
    config: {},
    current: {
        id: null,
        theme: {}
    },
    themes: []
}

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes();
    await InitializeLayout();

    document.getElementById('loading').style.opacity = 0;
}

const InitializeThemes = () => {
    return new Promise((resolve, reject) => {

        fetchConfig()
            .then(config => {
                state.config = config;
                state.current.id = config['current-theme'];

                fetchTheme(state.current.id)
                    .then(theme => {
                        state.current.theme = theme;
                        loadTheme(theme);
                        return resolve();
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
            .catch(err => {
                console.error(err);
            })
    })
}

const loadTheme = (theme) => {
    const root = document.documentElement;
    const background = document.getElementById('background');
    const colors = Object.keys(theme.colors);

    colors.forEach(key => {
        root.style.setProperty(key, theme.colors[key]);
    });

    background.style.background = `url(${theme.background.url})`;

    const filter = `
    blur(${theme.background.blur}px)
     opacity(${theme.background.opacity}%)
     brightness(${theme.background.brightness}%)
     contrast(${theme.background.contrast}%)
     saturate(${theme.background.saturate}%)
     grayscale(${theme.background.grayscale}%)
     sepia(${theme.background.sepia}%)
     hue-rotate(${theme.background['hue-rotate']}deg)
     invert(${theme.background.invert}%)
    `;

    background.style.filter = filter;
}

const InitializeLayout = () => {
    return new Promise((resolve, reject) => {
        console.log(state.config.frontpage)
        const containers = [
            'main',
            'bottom-left',
            'bottom-right',
            'right-top',
            'right-bottom'
        ]

        containers.forEach(key => {
            const type = state.config.frontpage[key];

            switch (type) {
                case 'MESSAGES':
                    loadMessages(key);
                    break;
                case 'GRADES':
                    loadGrades(key);
                    break;
            }
        })

        return resolve();
    });
}

const loadMessages = async (key) => {
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
        })
}

const loadGrades = (key) => {
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

    fetchGradeBook()
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

        })
}