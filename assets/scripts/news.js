document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const state = {
    news: {
        categories: {
            current: 'current'
        }
    }
}

const Initialize = async () => {
    InitializeNavBar();
    InitializeCategories();

    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    })

    InitializeQuery();

    document.getElementById('loading').style.opacity = 0;

    await loadNewsCurrent().catch(err => {
        displayError(err);
        throw err;
    });

    await loadNewsStatic().catch(err => {
        displayError(err);
        throw err;
    });

    await loadNewsOld().catch(err => {
        displayError(err);
        throw err;
    });

}

const InitializeQuery = () => {
    const hash = getParameterByName('news');

    if (!hash) return;
    loadNewsContent(hash);
}

const InitializeCategories = () => {
    const keys = [
        'current',
        'old',
        'static'
    ]

    keys.forEach(key => {
        const category = document.getElementById(`category-${key}`);

        category.className = state.news.categories.current == key ? 'selected' : '';
        category.addEventListener('click', async () => {
            document.getElementById(`category-${state.news.categories.current}`).className = '';


            state.news.categories.current = key;
            category.className = 'selected';

            switch (key) {
                case 'current':
                    keys.forEach(e => document.getElementById(e).style.display = 'none');
                    document.getElementById('current').style.display = 'flex';
                    break;
                case 'old':

                    keys.forEach(e => document.getElementById(e).style.display = 'none');
                    document.getElementById('old').style.display = 'flex';
                    break;
                case 'static':

                    keys.forEach(e => document.getElementById(e).style.display = 'none');
                    document.getElementById('static').style.display = 'flex';
                    break;
            }

        })
    });
}

const loadNewsCurrent = () => {
    return new Promise((resolve, reject) => {
        const root = document.getElementById('current');

        fetchNews('current', 1000)
            .then(list => {
                Object.keys(list).forEach(date => {
                    const news = list[date];

                    news.forEach(n => {
                        const valid = n.href != null;

                        const newsObject = document.createElement('div');
                        newsObject.className = 'news-object-current';
                        newsObject.id = n.href;
                        if(valid) {
                            newsObject.addEventListener('click', (e) => {
                                loadNewsContent(e.target.id);
                            })
                        }

                        const titleObject = document.createElement('h1');
                        titleObject.textContent = n.title;

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
                        
                        if(!valid) {
                            const disclaimer = document.createElement('h5');
                            disclaimer.textContent = 'Tiedotteella ei ole tämän enempää sisältöä.';
                            newsObject.className += ' disabled';

                            newsObject.appendChild(disclaimer);
                        }

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
                        loadNewsContent(e.target.id).catch(err => {
                            displayError(err);
                        });
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

const loadNewsContent = (href) => {
    const root = document.getElementById('content');

    return new Promise((resolve, reject) => {
        const [...hash] = href.split('/')

        setLoadingScreen(true);

        fetchNewsContent(hash[2])
            .then(content => {
                root.innerHTML = content.html;
                setLoadingScreen(false);
            })
            .catch(err => {
                return reject(err);
            })
    })
}

const setLoadingScreen = (value) => {
    document.getElementById('news-loading-screen').style.display = value ? 'flex' : 'none';
    document.getElementById('content').style.filter = value ? 'blur(2px)' : 'none'
}