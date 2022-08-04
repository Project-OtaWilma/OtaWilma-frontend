document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const sections = [];
const settings = {
    'Yleinen': {
        '--accent-main': 'Ensisijainen väri',
        '--background-main': 'Taustan ensisijainen väri',
        '--background-darker': 'Taustan toissijainen väri',
    },
    'Etusivu': {
        '--info-background': 'Kellon tausta',
        '--clock-background': 'Kellon väri',
        '--clock-markings': 'Kellon merkinnät',
        '--info-h1': 'Kellon teksi'
    },
    'Teksti': {
        '--font-h1': 'Otsikot',
        '--font-h2': 'Ensisijainen sisältö',
        '--font-h3': 'Toissijainen sisältö',
        '--font-h4': 'Valikon logotekstin väri',
        '--font-h5': 'Valikon osioiden väri'
    },
    'Ääriviivat ja varjostus': {
        '--border-main': 'Ääriviivojen ensisijainen väri',
        '--border-darker': 'Ääriviivojen toissijainen väri',
        '--shadow-main': 'Varjostuksen ensisijainen väri',
        '--shadow-darker': 'Varjostuksen toissijainen väri',
    },
    'Työjärjestys': {
        '--schedule-main': 'Työjärjetyksen taustan väri',
        '--schedule-h1': 'Työjärjetyksen ensisijaisen tekstin väri'
    },
    'Kurssitarjotin': {
        '--L2021-mandatory-main': 'Pakollinen (LOPS 2021)',
        '--L2021-mandatory-selected': 'Valittu Pakollinen (LOPS 2021)',
        '--L2021-g-optional-main': 'Valtakunallinen valinnainen (LOPS 2021)',
        '--L2021-g-optional-selected': 'Valittu valtakunallinen valinnainen (LOPS 2021)',
        '--L2021-l-optional-main': 'Koulukohtainen valinnainen (LOPS 2021)',
        '--L2021-l-optional-selected': 'Valittu koulukohtainen valinnainen (LOPS 2021)',
        '--L2021-diploma-main': 'Lukiodiplomi (LOPS 2021)',
        '--L2021-diploma-selected': 'Valittu lukiodiplomi (LOPS 2021)',
        '--L2016-l-optional-main': 'Koulukohtainen soveltava kurssi (LOPS 2016)',
        ' --L2016-l-optional-selected': 'Valittu koulukohtainen soveltava kurssi (LOPS 2016)',
        '--L2016-g-optional-main': 'Valtakunnalinen Soveltava kurssi (LOPS 2016)',
        '--L2016-g-optional-selected': 'Valittu valtakunnalinen soveltava kurssi (LOPS 2016)',
        '--course-tray-h1': 'Kurssien tekstin ensisijainen väri'
    },
    'Muu': {
        '--login-main': 'Painikkeiden ensisijainen väri',
        '--login-lighter': 'Painikkeiden toissijainen väri',
        '--error': 'Virheilmoitusten ensisijainen väri'
    }
}
const imageTypes = ['png', 'svg', 'jpg', 'gif', 'webp'];
const nonTransparent = ['--accent-main', '--background-darker', '--clock-background'];


const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes().catch(err => {
        displayError(err);
        throw err;
    });
    await InitializeSideBar().catch(err => {
        displayError(err);
        throw err;
    });
    await InitializeEditor().catch(err => {
        displayError(err);
        throw err;
    });

    await loadUserInfo().catch(err => {
        displayError(err);
        throw err;
    });

    document.getElementById('loading').style.opacity = 0;
}

const InitializeSideBar = () => {
    return new Promise((resolve, reject) => {
        const sideBar = document.getElementById('side-bar');
        const root = document.getElementById('content');

        Array.from(sideBar.childNodes).filter(c => c.textContent.trim()).forEach(element => {
            switch (element.tagName) {
                case 'H1':
                    element.addEventListener('click', (e) => {
                        const target = document.getElementById(e.target.className);
                        if (target) {
                            target.scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                    })
                    break;
                default:
                    break;
            }
        });

        return resolve();
    })
}

const InitializeEditor = () => {
    return new Promise((resolve, reject) => {
        fetchThemeList()
            .then(async (list) => {
                setupThemeList();

                for (let i = 0; i < list.length; i++) {
                    const id = list[i];

                    const theme = await fetchTheme(id)
                        .catch(err => {
                            return reject(err);
                        })

                    state.themes.push(theme);

                    createThemePreview(theme);
                    loadThemePreview(id, theme);

                }

                setupColorEditor();
                loadColorEditor();

                setupBackgroundEditor();
                loadBackgroundEditor();

                setupThemeActions();
                loadThemeActions();

                return resolve()
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const setupThemeList = () => {
    const newTheme = document.getElementById('new-theme');

    newTheme.addEventListener('click', () => {
        onCreateTheme();
    })
}

const createThemePreview = (theme) => {
    const defaultThemeContainer = document.getElementById('default-themes');
    const customThemeContainer = document.getElementById('custom-themes');

    const themeCount = document.getElementById('theme-count');

    const translations = {
        'light': 'Vaalea teema',
        'dark': 'Tumma teema'
    }

    const themeElement = document.createElement('div');
    themeElement.className = 'theme';
    themeElement.id = theme.hash;

    const nameElement = document.createElement('h2');
    nameElement.textContent = defaults.includes(theme.hash) ? translations[theme.hash] : '';

    const backgroundElement = document.createElement('div');
    backgroundElement.className = 'theme-background';

    themeElement.addEventListener('click', async (e) => {
        onSetTheme(e);
    });

    const mainElement = document.createElement('div');
    mainElement.className = 'theme-main';

    const h1 = document.createElement('h1');
    h1.textContent = defaults.includes(theme.hash) ? 'OtaWilma' : 'Oma';

    const h2 = document.createElement('h2');
    h2.textContent = 'Teema';


    mainElement.appendChild(h1);
    mainElement.appendChild(h2);

    themeElement.appendChild(backgroundElement);
    themeElement.appendChild(mainElement);


    const root = defaults.includes(theme.hash) ? defaultThemeContainer : customThemeContainer;
    root.appendChild(themeElement);

    const count = state.themes.length - 2;

    themeCount.textContent = `${count} / 10`;
    if (count >= 10 && document.getElementById('new-theme')) document.getElementById('new-theme').remove();
}

const loadThemePreview = (id, theme) => {
    const themeElement = document.getElementById(id);

    if (state.current.id == id) {
        themeElement.className = 'theme selected';
    }

    const filter = `
    blur(${theme.background.blur.value}px)
     opacity(${theme.background.opacity.value}%)
     brightness(${theme.background.brightness.value}%)
     contrast(${theme.background.contrast.value}%)
     saturate(${theme.background.saturate.value}%)
     grayscale(${theme.background.grayscale.value}%)
     sepia(${theme.background.sepia.value}%)
     hue-rotate(${theme.background['hue-rotate'].value}deg)
     invert(${theme.background.invert.value}%)
    `;

    themeElement
        .style = `border-top: solid 10px ${theme.colors['--accent-main'].value};`;

    themeElement.getElementsByClassName('theme-background')[0]
        .style = `
        background: ${theme.background['url'].value ? `url(${theme.background['url'].value})` : theme.colors['--background-main'].value};
        filter: ${filter}
        `;

    themeElement.getElementsByClassName('theme-main')[0]
        .style = `
        background-color: ${theme.colors['--background-main'].value};
        box-shadow: 0 0 10px ${theme.colors['--shadow-main'].value};
        border-left: solid 2px ${theme.colors['--accent-main'].value}
        `;

    themeElement.getElementsByTagName('h1')[0]
        .style.color = theme.colors['--font-h1'].value;

    themeElement.getElementsByTagName('h2')[0]
        .style.color = theme.colors['--font-h2'].value;

}


const onSetTheme = async (e) => {
    setLoadingScreen(true);

    await setTheme(e.target.id);
    state.current.id = e.target.id;


    fetchTheme(e.target.id)
        .then(theme => {
            state.current.theme = theme;

            loadTheme(theme);
            loadColorEditor();
            loadBackgroundEditor();
            loadThemeActions();

            setLoadingScreen(false);
        })
        .catch(err => {
            displayError(err);
        });

}

const onCreateTheme = async (e) => {
    setLoadingScreen(true);

    createTheme()
        .then(res => {
            const hash = res.session.hash;

            fetchTheme(hash)
                .then(theme => {
                    state.themes.push(theme);
                    createThemePreview(theme);
                    loadThemePreview(hash, theme);

                    setLoadingScreen(false);
                })
                .catch(err => {
                    displayError(err);
                })
        })
        .catch(err => {
            displayError(err);
        })
}

const setupColorEditor = () => {
    const editor = document.getElementById('theme-editor');
    editor.className = defaults.includes(state.current.id) ? 'editor-disabled' : 'editor';

    Object.keys(settings).forEach(key => {
        const section = document.createElement('div');
        section.id = key;
        section.className = 'section collapsed';
        sections.push(section);
    
        const titleElement = document.createElement('div');
        titleElement.className = 'section-title';

        const h1 = document.createElement('h1');
        h1.textContent = key;

        const action = document.createElement('button');
        action.textContent = '‣';
        action.className = 'closed';

        titleElement.addEventListener('click', (e) => {
            const element = document.getElementById(key);
            element.className = element.className.includes('collapsed') ? 'section' : 'section collapsed';

            action.className = action.className == 'open' ? 'closed' : 'open';
        });


        titleElement.appendChild(action);
        titleElement.appendChild(h1);

        editor.appendChild(titleElement);
        editor.appendChild(section);

        const inputs = settings[key];
        Object.keys(inputs).forEach(input => {
            
            const type = state.current.theme.colors[input].type;
            
            switch (type) {
                case 'color':
                    createColorInput(input, section);
                    break;
                case 'number':
                    createNumberInput(input, section);
                    break;
            }
            
        })
    })
}

const loadColorEditor = () => {
    const editor = document.getElementById('theme-editor');
    editor.className = defaults.includes(state.current.id) ? 'editor-disabled' : 'editor';
    
    Object.keys(settings).forEach(category => {
        
        
        Object.keys(settings[category]).forEach(key => {
            switch (state.current.theme.colors[key].type) {
        
                case 'color':
                    const r = parseRgb(state.current.theme.colors[key].value);
                    const hex = rgbToHex(r[0], r[1], r[2]);
        
                    const colorInput = document.getElementById(`${key}.color`);
                    colorInput.value = hex;
        
                    const opacityInput = document.getElementById(`${key}.opacity`);
                    opacityInput.value = r[3] * 100;
                    break;
                case 'number':
                    const numberInput = document.getElementById(`${key}.number`);
                    numberInput.value = state.current.theme.colors[key].value;
                    break;
            }
            
        })
        
    })
    
    Object.keys(state.current.theme.colors).forEach(key => {
    });
    
}

const onColorChanged = async (e) => {
    const form = e.target.parentNode;
    const key = (e.target.id).split('.')[0];
    const raw = hexToRgb(form['color'].value, form['opacity'].value);
    const value = `rgba(${raw.r}, ${raw.g}, ${raw.b}, ${raw.a / 100})`;

    setLoadingScreen(true);

    await editThemeColors(state.current.id, key, value)
        .then(() => {
            state.current.theme.colors[key].value = value;

            loadThemePreview(state.current.id, state.current.theme);
            loadTheme(state.current.theme);

            setLoadingScreen(false);
        })
        .catch(err => {
            displayError({ err: 'Failed to set theme property', status: 400 });
        })
}

const setupBackgroundEditor = () => {
    Object.keys(state.current.theme.background).forEach(key => {
        const input = document.getElementById(key);

        input.addEventListener('change', async (e) => {
            onBackgroundChanged(e);
        })

        input.parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
        })

        input.addEventListener('submit', (e) => {
            e.preventDefault();
        })
    });
}

const loadBackgroundEditor = () => {
    const editor = document.getElementById('background-editor');
    editor.className = defaults.includes(state.current.id) ? 'editor-disabled' : 'editor';

    const preview = document.getElementById('background-preview');
    preview.src = state.current.theme.background.url.value;
    
    const a = document.createElement('a');
    a.href = state.current.theme.background.url.value;
    const format = a.pathname.split('.').reverse()[0];

    const formatLabel = document.getElementById('format-label');
    formatLabel.textContent = state.current.theme.background.url.value ? imageTypes.includes(format) ? format : '?' : '';
    formatLabel.style.color = imageTypes.includes(format) ? 'var(--login-lighter)' : 'var(--error)';

    Object.keys(state.current.theme.background).forEach(key => {
        const input = document.getElementById(key);
        input.value = state.current.theme.background[key].value;
    });
}

const onBackgroundChanged = async (e) => {
    const preview = document.getElementById('background-preview');
    const error = document.getElementById('background-error');
    error.style.display = 'none';

    if (!e.target.value) { e.target.value = e.target.id == 'url' ? null : 0 }

    setLoadingScreen(true);

    if(e.target.value.length >= 1024) {
        setLoadingScreen(false);
        e.target.value = '';
        error.style.display = 'block';
        error.innerHTML = 'linkin tulee olla alle <strong>1024</strong> merkin pituinen';
        return;
    }

    await editThemeBackground(state.current.id, e.target.id, e.target.value)
        .then(() => {
            state.current.theme.background[e.target.id].value = e.target.value;
            preview.src = state.current.theme.background.url.value;

            const a = document.createElement('a');
            a.href = state.current.theme.background.url.value;
            const format = a.pathname.split('.').reverse()[0];

            const formatLabel = document.getElementById('format-label');
            formatLabel.textContent = state.current.theme.background.url.value ? imageTypes.includes(format) ? format : '?' : '';
            formatLabel.style.color = imageTypes.includes(format) ? 'var(--login-lighter)' : 'var(--error)';

            loadTheme(state.current.theme);
            loadThemePreview(state.current.id, state.current.theme);

            setLoadingScreen(false);
        })
        .catch(err => {
            displayError(err)
        })
}

const createColorInput = (key, root) => {
    const type = 'color';
    const formElement = document.createElement('form');
    const labelElement = document.createElement('label');
    labelElement.textContent = key;

    const section = Object.keys(settings).find(t => Object.keys(settings[t]).includes(key));

    if (section) {
        labelElement.textContent = settings[section][key];
    }

    const colorLabel = document.createElement('h3');
    colorLabel.textContent = 'Väri [RGB]';

    const colorInput = document.createElement('input');
    colorInput.type = type;
    colorInput.id = `${key}.${type}`;
    colorInput.name = type;
    colorInput.className = `${type}-input`;

    const opacityLabel = document.createElement('h3');
    opacityLabel.textContent = 'Läpinäkyvyys [%]';
    opacityLabel.style.display = nonTransparent.includes(key) ? 'none' : 'flex';

    const opacityInput = document.createElement('input');
    opacityInput.type = 'number';
    opacityInput.id = `${key}.opacity`;
    opacityInput.name = 'opacity';
    opacityInput.className = 'opacity-input';

    opacityInput.style.display = nonTransparent.includes(key) ? 'none' : 'flex';

    formElement.addEventListener('change', async (e) => {
        onColorChanged(e);
    });

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    formElement.appendChild(labelElement);
    formElement.appendChild(colorLabel);
    formElement.appendChild(colorInput);
    formElement.appendChild(opacityLabel);
    formElement.appendChild(opacityInput);

    root.appendChild(formElement);
}

const createNumberInput = (key, root) => {
    const type = 'number';
    const formElement = document.createElement('form');
    const labelElement = document.createElement('label');
    labelElement.textContent = key;

    const section = Object.keys(settings).find(t => Object.keys(settings[t]).includes(key))

    if (section) {
        if (!sections.includes(section)) {
            sections.push(section);

            const titleElement = document.createElement('h1');
            titleElement.textContent = section;

            root.appendChild(titleElement);
        }

        labelElement.textContent = settings[section][key];
    }

    const numberInput = document.createElement('input');
    numberInput.type = type;
    numberInput.id = `${key}.${type}`;
    numberInput.name = type;
    numberInput.className = `${type}-input`;

    formElement.appendChild(labelElement);
    formElement.appendChild(numberInput);
    root.appendChild(formElement);
}

const setupThemeActions = () => {
    const remove = document.getElementById('delete-theme');
    const confirm = document.getElementById('confirm-delete');
    const cancel = document.getElementById('cancel-delete');

    remove.addEventListener('click', () => {
        setRemovalPopup(true);
    })

    confirm.addEventListener('click', () => {
        setLoadingScreen(true);
        deleteTheme(state.current.id)
            .then(status => {
                console.log(status);
                location.reload();
            })
            .catch(err => {
                displayError(err);
            })
    })

    cancel.addEventListener('click', () => {
        setRemovalPopup(false);
    })
}

const loadThemeActions = () => {
    const actions = document.getElementById('theme-actions');
    actions.className = defaults.includes(state.current.id) ? 'theme-actions disabled' : 'theme-actions';
}

const loadUserInfo = () => {
    return new Promise((resolve, reject) => {

        const usernameField = document.getElementById('username-field');
        usernameField.textContent = state.config.username;

        const copyCheckbox = document.getElementById('checkbox');

        const copyButton = document.getElementById('copy-session');
        copyButton.style.pointerEvents = copyCheckbox.checked ? 'all' : 'none';
        copyButton.style.opacity = copyCheckbox.checked ? '100%' : '30%';
        copyButton.textContent = 'Kopio OtaWilma-tunnus' 

        copyButton.addEventListener('click', async (e) => {
            await navigator.clipboard.writeText(getCookie('session'));
            e.target.textContent = 'Kopioitu leikepöydälle';
        })

        copyCheckbox.addEventListener('change', (e) => {
            copyButton.style.pointerEvents = e.target.checked ? 'all' : 'none';
            copyButton.style.opacity = e.target.checked ? '100%' : '30%';
            copyButton.textContent = 'Kopio OtaWilma-tunnus'
        });

        const syncButton = document.getElementById('sync');
        syncButton.addEventListener('click', () => {
            clearCache('config-cache');
            clearCache('theme-cache');
            location.reload();
        });

        const historyRoot = document.getElementById('login-history');
        fetchLoginHistory()
        .then(list => {
            if(list) {
                list['login-history'].forEach(event => {
                    const date = new Date(event.timeStamp);
                    const format = {
                        year: 'numeric',
                        month: 'numeric',
                        date: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    }

                    const eventElement = document.createElement('div');
                    eventElement.className = 'login-object';

                    const dateUl = document.createElement('ul');
                    const dateKey = document.createElement('a');
                    dateKey.textContent = 'Milloin: '
                    const dateValue = document.createElement('a');
                    dateValue.textContent = date.toLocaleDateString('FI-fi', format);

                    dateUl.appendChild(dateKey);
                    dateUl.appendChild(dateValue);
                    eventElement.appendChild(dateUl);

                    const userUl = document.createElement('ul');
                    const userKey = document.createElement('a');
                    userKey.textContent = 'Kuka: '
                    const userValue = document.createElement('a');
                    userValue.textContent = event.username;

                    userUl.appendChild(userKey);
                    userUl.appendChild(userValue);
                    eventElement.appendChild(userUl);

                    historyRoot.appendChild(eventElement);
                })
            }
        })
        .catch(err => {
            return reject(err);
        })

        return resolve();
    })
}

const setRemovalPopup = (bool) => {
    document.getElementById('removal-confirmation').style.display = bool ? 'flex' : 'none';
}

const setLoadingScreen = (bool) => {
    document.getElementById('content').style.filter = bool ? 'blur(3px)' : 'none';
    document.getElementById('editor-loading-screen').style.display = bool ? 'flex' : 'none';
}