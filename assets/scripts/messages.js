document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const state = {
    messages: {
        categories: {
            current: 'inbox'
        }
    }
}

const Initialize = async () => {
    InitializeNavBar();

    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    });

    InitializeCategories();

    await loadMessageList('inbox').catch(err => {
        displayError(err);
        throw err;
    });

    InitializeQuery();

    document.getElementById('loading').style.opacity = 0;
}

const InitializeQuery = () => {
    const hash = getParameterByName('message');

    if (!hash) return;

    loadMessageContent(hash).catch(err => {
        displayError(err);
    });
}

const InitializeCategories = () => {
    const root = document.getElementById('categories');

    const categories = {
        'Saapuneet': 'inbox',
        'Lähetetyt': 'outbox',
        'Tapahtumakutsut': 'appointments',
        'OtaWilma': 'announcements'
    };

    Object.keys(categories).forEach(category => {
        const div = document.createElement('div');
        div.id = categories[category];
        div.addEventListener('click', (e) => {
            loadMessageList(div.id).catch(err => {
                displayError(err);
            });
        })


        const h1 = document.createElement('h1');
        h1.textContent = category;

        div.appendChild(h1);
        root.appendChild(div);
    })
}

const loadMessageList = (path) => {
    const root = document.getElementById('message-list');

    setlistLoadingScreen(true);

    document.getElementById(state.messages.categories.current).className = '';
    document.getElementById(path).className = 'category-selected';
    state.messages.categories.current = path;

    return new Promise((resolve, reject) => {
        fetchMessages(path, 1000)
            .then(list => {
                root.replaceChildren([]);

                for (let i = 0; i < list.length; i++) {
                    const message = list[i];

                    const messageObject = document.createElement('div');
                    messageObject.className = message.isEvent ? `message-object ${message.status}` : 'message-object';
                    messageObject.id = message.new ? 'new' : '';

                    const title = document.createElement('h1');
                    title.textContent = message.subject;
                    title.id = message.id;
                    title.addEventListener('click', (e) => {
                        loadMessageContent(e.target.id).catch(err => {
                            displayError(err);
                        });
                    });

                    const icon = document.createElement('div');

                    if (message.isEvent) {
                        icon.className = 'calendar';
                    }

                    const timeStamp = document.createElement('h2');
                    timeStamp.textContent = message.timeStamp;

                    const sender = document.createElement('h2');
                    sender.textContent = message.senders[0].name;

                    const replies = document.createElement('h3');
                    replies.textContent = `${message.replies ? `${message.replies} ${message.replies > 1 ? 'vastausta' : 'vastaus'}` : ''}`;

                    
                    messageObject.appendChild(title);
                    messageObject.appendChild(timeStamp);
                    messageObject.appendChild(sender);
                    messageObject.appendChild(replies);
                    if(message.new) {
                        const newElement = document.createElement('h7');
                        newElement.textContent = 'Uusi';

                        messageObject.appendChild(newElement);
                    }
                    messageObject.appendChild(icon);
                    

                    root.appendChild(messageObject);
                }
                setlistLoadingScreen(false);
                return resolve();
            })
            .catch(err => {
                return reject(err);
            })

    })
}

const loadMessageContent = (id) => {
    return new Promise((resolve, reject) => {
        setMessageLoadingScreen(true);
        const title = document.getElementById('message-title');

        const infoRoot = document.getElementById('message-info');
        infoRoot.replaceChildren([]);

        const contentRoot = document.getElementById('message-content');
        const repliesRoot = document.getElementById('message-responses');
        repliesRoot.replaceChildren([]);

        fetchMessageContent(id)
            .then(list => {
                console.log(list);
                const message = list[0];

                title.textContent = message.subject;

                // Info
                const senderUl = document.createElement('ul');
                const senderKey = document.createElement('a');
                senderKey.textContent = 'Lähettäjä(t) ';

                const senderValue = document.createElement('a');
                senderValue.textContent = message.sender;

                senderUl.appendChild(senderKey);
                senderUl.appendChild(senderValue);

                const recipientUl = document.createElement('ul');
                const recipientKey = document.createElement('a');
                recipientKey.textContent = 'Vastaanottaja(t) ';

                const recipientValue = document.createElement('a');
                recipientValue.textContent = message.recipients;

                recipientUl.appendChild(recipientKey);
                recipientUl.appendChild(recipientValue);

                const timeStampUl = document.createElement('ul');
                const timeStampKey = document.createElement('a');
                timeStampKey.textContent = 'Lähetetty ';

                const timeStampValue = document.createElement('a');
                timeStampValue.textContent = message.timeStamp;

                timeStampUl.appendChild(timeStampKey);
                timeStampUl.appendChild(timeStampValue);

                infoRoot.appendChild(senderUl);
                infoRoot.appendChild(recipientUl);
                infoRoot.appendChild(timeStampUl);

                // Content
                contentRoot.innerHTML = message.content;


                if (message.fromWilma) {
                    const wilmaLink = document.createElement('div');
                    wilmaLink.className = 'wilma-link';

                    const icon = document.createElement('div');
                    icon.className = 'icon';

                    const text = document.createElement('h6');
                    text.className = 'icon-text';
                    text.textContent = 'Avaa Wilmassa';

                    wilmaLink.appendChild(icon);
                    wilmaLink.appendChild(text);

                    wilmaLink.addEventListener('click', () => {
                        redirectToWilma(`messages/${id}?Cookie=Wilma2SID=${getCookie('Wilma2SID')}`);
                    })

                    contentRoot.appendChild(wilmaLink);
                }

                // Replies
                message.replies.forEach(reply => {
                    const responseObject = document.createElement('div');

                    const currentUser = username(configufation.config['username']);
                    const responseUser = reply.sender.split(',')[0].split(' ').reverse().join(' ');
                    responseObject.className = responseUser.toLowerCase() == currentUser.toLowerCase() ? 'message-reply own' : 'message-reply other';

                    const sender = document.createElement('h4');
                    sender.textContent = `${reply.sender} ${reply.timeStamp}`;

                    responseObject.innerHTML = reply.content;
                    responseObject.appendChild(sender);

                    repliesRoot.appendChild(responseObject);
                });

                setMessageLoadingScreen(false);
                return resolve();
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const setMessageLoadingScreen = (value) => {
    document.getElementById('message-loading-screen').style.display = value ? 'flex' : 'none';
    document.getElementById('message-container').style.filter = value ? 'blur(2px)' : 'none';
}

const setlistLoadingScreen = (value) => {
    document.getElementById('list-loading-screen').style.display = value ? 'flex' : 'none';
    document.getElementById('message-list').style.filter = value ? 'blur(2px)' : 'none';
}