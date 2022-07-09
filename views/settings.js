document.addEventListener('DOMContentLoaded', () => {
    Initialize();
});

const Initialize = async () => {
    InitializeNavBar();
    await InitializeThemes();
    await InitializeSideBar();
    await InitializeEditor();

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
            .then(list => {
                state.themes = list;
                appendThemeList(list);
                setupColorEditor();
                loadColorEditor();
                setupBackgroundEditor();
                loadBackgroundEditor();
                return resolve()
            })
            .catch(err => {
                console.error(err);
            })
    });
}

const appendThemeList = (list) => {
    const defaultThemeContainer = document.getElementById('default-themes');
    const customThemeContainer = document.getElementById('custom-themes');

    const translations = {
        'light': 'Vaalea teema',
        'dark': 'Tumma teema'
    }

    list.forEach(theme => {

        const themeElement = document.createElement('div');
        themeElement.className = 'theme';
        themeElement.id = theme.id;

        const nameElement = document.createElement('h2');
        nameElement.textContent = defaults.includes(theme.id) ? translations[theme.id] : '';

        const backgroundElement = document.createElement('div');
        backgroundElement.className = 'theme-background';


        themeElement.addEventListener('click', async () => {
            await setTheme(theme.id);
            state.current.id = theme.id;

            fetchTheme(theme.id)
                .then(theme => {
                    state.current.theme = theme;

                    loadTheme(theme);
                    loadColorEditor();
                    loadBackgroundEditor();
                })
                .catch(err => {
                    console.error(err);
                });

        });

        const mainElement = document.createElement('div');
        mainElement.className = 'theme-main';

        const h1 = document.createElement('h1');
        h1.textContent = defaults.includes(theme.id) ? 'OtaWilma' : 'Oma';

        const h2 = document.createElement('h2');
        h2.textContent = 'Teema';



        mainElement.appendChild(h1);
        mainElement.appendChild(h2);
        
        themeElement.appendChild(backgroundElement);
        themeElement.appendChild(mainElement);

        const root = defaults.includes(theme.id) ? defaultThemeContainer : customThemeContainer;

        root.appendChild(themeElement);
        loadThemePreview(theme.id, theme);
    });
}

const loadThemePreview = (id, theme) => {
    const themeElement = document.getElementById(id);
    console.log(theme);
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

    themeElement
    .style = `border-top: solid 10px ${theme.colors['--accent-main']};`;
    
    themeElement.getElementsByClassName('theme-background')[0]
        .style = `
        background: ${theme.background['url'] ? `url(${theme.background['url']})` : theme.colors['--background-main']};
        filter: ${filter}
        `;
    
    themeElement.getElementsByClassName('theme-main')[0]
        .style = `
        background-color: ${theme.colors['--background-main']};
        box-shadow: 0 0 10px ${theme.colors['--shadow-main']};
        border-left: solid 2px ${theme.colors['--accent-main']}
        `;
    
    themeElement.getElementsByTagName('h1')[0]
        .style.color = theme.colors['--font-h1'];

    themeElement.getElementsByTagName('h2')[0]
        .style.color = theme.colors['--font-h2'];

}

const setupColorEditor = () => {
    const sections = [];
    const editor = document.getElementById('theme-editor');
    editor.className = defaults.includes(state.current.id) ? 'editor-disabled' : 'editor';


    const settings = {
        'Yleinen': {
            '--accent-main': 'Ensisijainen väri',
            '--background-main': 'Taustan ensisijainen väri',
            '--background-darker': 'Taustan toissijainen väri',
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
            '--schedule-h1': 'Työjärjetyksen ensisijaisen tekstin väri',
            '--schedule-h2': 'Työjärjetyksen toissijaisen tekstin väri'
        },
        'Kurssitarjotin': {
            
        },
    }
    
    Object.keys(state.current.theme.colors).forEach(key => {
        const formElement = document.createElement('form');
        const labelElement = document.createElement('label');
        labelElement.textContent = key;

        const section = Object.keys(settings).find(t => Object.keys(settings[t]).includes(key))
        if(section) {
            if(!sections.includes(section)) {
                sections.push(section);
                
                
                const titleElement = document.createElement('h1');
                titleElement.textContent = section;
                
                editor.appendChild(titleElement);
            }
            
            labelElement.textContent = settings[section][key];
        }

        const colorLabel = document.createElement('h3');
        colorLabel.textContent = 'Väri';

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.id = `${key}.color`;
        colorInput.name = 'color';
        colorInput.className = 'color-input';

        const opacityLabel = document.createElement('h3');
        opacityLabel.textContent = 'Läpinäkyvyys';

        const opacityInput = document.createElement('input');
        opacityInput.type = 'number';
        opacityInput.id = `${key}.opacity`;
        opacityInput.name = 'opacity';
        opacityInput.className = 'opacity-input';

        formElement.addEventListener('change', async (e) => {
            const form = e.target.parentNode;
            const key = (e.target.id).split('.')[0];
            const raw = hexToRgb(form['color'].value, form['opacity'].value);
            const value = `rgba(${raw.r}, ${raw.g}, ${raw.b}, ${raw.a})`;

            await editThemeColors(state.current.id, key, value);

            state.current.theme.colors[key] = value;

            loadThemePreview(state.current.id, state.current.theme);
            loadTheme(state.current.theme);

        });

        formElement.appendChild(labelElement);
        formElement.appendChild(colorLabel);
        formElement.appendChild(colorInput);
        formElement.appendChild(opacityLabel);
        formElement.appendChild(opacityInput);

        editor.appendChild(formElement);
    });
    
}

const loadColorEditor = () => {
    Object.keys(state.current.theme.colors).forEach(key => {
        const editor = document.getElementById('theme-editor');
        editor.className = defaults.includes(state.current.id) ? 'editor-disabled' : 'editor';

        const r = parseRgb(state.current.theme.colors[key]);
        const hex = rgbToHex(r[0], r[1], r[2]);

        const colorInput = document.getElementById(`${key}.color`);
        colorInput.value = hex;

        const opacityInput = document.getElementById(`${key}.opacity`);
        opacityInput.value = r[3];

    });
}

const setupBackgroundEditor = () => {
    Object.keys(state.current.theme.background).forEach(key => {
        const input = document.getElementById(key);
        input.addEventListener('change', async (e) => {
            if (!e.target.value) { e.target.value = e.target.id == 'url' ? null : 0 }

            await editThemeBackground(state.current.id, e.target.id, e.target.value);

            state.current.theme.background[e.target.id] = e.target.value;
            loadTheme(state.current.theme);
            loadThemePreview(state.current.id, state.current.theme);
        })
    });
}

const loadBackgroundEditor = () => {
    const editor = document.getElementById('background-editor');
    editor.className = defaults.includes(state.current.id) ? 'editor-disabled' : 'editor';
    const preview = document.getElementById('background-preview');
    preview.src = state.current.theme.background.url;

    const filter = `
    blur(${state.current.theme.background.blur}px)
     opacity(${state.current.theme.background.opacity}%)
     brightness(${state.current.theme.background.brightness}%)
     contrast(${state.current.theme.background.contrast}%)
     saturate(${state.current.theme.background.saturate}%)
     grayscale(${state.current.theme.background.grayscale}%)
     sepia(${state.current.theme.background.sepia}%)
     hue-rotate(${state.current.theme.background['hue-rotate']}deg)
     invert(${state.current.theme.background.invert}%)
    `;

    Object.keys(state.current.theme.background).forEach(key => {
        const input = document.getElementById(key);
        input.value = state.current.theme.background[key];
    });
}
