document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();

    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    })

    InitializeQuery();

    /* Load layout afterwards to seemingly increase loading speeds */
    document.getElementById('loading').style.opacity = 0;

    await loadNewsCurrent();
    await loadNewsStatic();
    await loadNewsOld();
}

const InitializeQuery = () => {
    const hash = getParameterByName('news');

    if(!hash) return;
    loadNewsContent(hash);
}

const loadNewsCurrent = () => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('current');
        
        fetchNews('current', 1000)
        .then(list => {
            Object.keys(list).forEach(date => {
                const news = list[date];

                news.forEach(n => {
                    const newsObject = document.createElement('div');
                    newsObject.className = 'news-object-current';

                    const titleObject = document.createElement('h1');
                    titleObject.textContent = n.title;
                    titleObject.id = n.href;
                    titleObject.addEventListener('click', (e) => {
                        loadNewsContent(e.target.id);
                    })

                    const dateObject = document.createElement('h4');
                    dateObject.textContent = date;

                    const senderObject = document.createElement('h4');
                    senderObject.textContent = n.sender.name;

                    const descriptionObject = document.createElement('h3');
                    descriptionObject.textContent = n.description;

                    newsObject.appendChild(titleObject);
                    newsObject.appendChild(dateObject);
                    newsObject.appendChild(senderObject);
                    newsObject.appendChild(descriptionObject);
                    root.appendChild(newsObject);
                });

            });

            return resolve();
        })
        .catch(err => {
            return reject(err);
        })
    })
}

const loadNewsStatic = () => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('static');
        
        fetchNews('static', 1000)
        .then(list => {
            
            list.forEach(news => {
            
                const newsObject = document.createElement('div');
                newsObject.className = 'news-object-static';
                newsObject.id = news.href;
                newsObject.addEventListener('click', (e) => {
                    loadNewsContent(e.target.id);
                })

                const titleObject = document.createElement('h1');
                titleObject.textContent = news.title;

                const interactObject = document.createElement('h4');
                interactObject.textContent = 'Lue tiedote';

                newsObject.appendChild(titleObject);
                newsObject.appendChild(interactObject);
                root.appendChild(newsObject);
            });
            return resolve();
        })
        .catch(err => {
            return reject(err);
        })
        
    })
}

const loadNewsOld = () => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('old');
        
        fetchNews('old', 1000)
        .then(list => {
            console.log(list);
            
            list.forEach(news => {
            
                const newsObject = document.createElement('div');
                newsObject.className = 'news-object-static';
                newsObject.id = news.href;
                newsObject.addEventListener('click', (e) => {
                    loadNewsContent(e.target.id);
                })

                const titleObject = document.createElement('h1');
                titleObject.textContent = news.title;

                const interactObject = document.createElement('h4');
                interactObject.textContent = 'Lue tiedote';

                newsObject.appendChild(titleObject);
                newsObject.appendChild(interactObject);
                root.appendChild(newsObject);
            });
            
        })
        .catch(err => {
            return reject(err);
        })
        
    })
}

const loadNewsContent = (href) => {
    const root = document.getElementById('content');

    return new Promise((resolve, reject) => {
        const [...hash] = href.split('/')
        console.log(hash[2]);
    
        fetchNewsContent(hash[2])
        .then(content => {
            root.innerHTML = content.html;
        })
        .catch(err => {
            return reject(err);
        })
    })
}