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

    defaultThemeContainer.replaceChildren([]);
    customThemeContainer.replaceChildren([]);

    list.forEach(theme => {

        const themeElement = document.createElement('div');
        themeElement.className = 'theme';
        themeElement.id = theme.id;

        const nameElement = document.createElement('h2');
        nameElement.textContent = defaults.includes(theme.id) ? translations[theme.id] : '';

        const previewElement = document.createElement('div');
        previewElement.className = 'theme-preview';

        previewElement.addEventListener('click', async () => {
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
        mainElement.className = 'main';

        const textElement = document.createElement('div');
        textElement.className = 'text';

        const h1 = document.createElement('h1');
        h1.textContent = defaults.includes(theme.id) ? 'OtaWilma' : 'Oma';

        const h2 = document.createElement('h2');
        h2.textContent = 'Teema';

        const secondaryElement = document.createElement('div');
        secondaryElement.className = 'secondary';


        themeElement.appendChild(nameElement);
        textElement.appendChild(h1);
        textElement.appendChild(h2);

        mainElement.appendChild(textElement);
        mainElement.appendChild(secondaryElement);
        previewElement.appendChild(mainElement);
        themeElement.appendChild(previewElement);

        const root = defaults.includes(theme.id) ? defaultThemeContainer : customThemeContainer;

        root.appendChild(themeElement);
        loadThemePreview(theme.id, theme);
    });
}

const loadThemePreview = (id, theme) => {
    const themeElement = document.getElementById(id);

    themeElement.getElementsByClassName('theme-preview')[0]
        .style.backgroundColor = theme['--background-main'];

    themeElement.getElementsByClassName('text')[0]
        .style.borderTop = `solid 3px ${theme['--accent-main']}`;

    themeElement.getElementsByTagName('h1')[0]
        .style.color = theme['--font-h1'];

    themeElement.getElementsByTagName('h2')[1]
        .style.color = theme['--font-h2'];

    themeElement.getElementsByClassName('secondary')[0]
        .style.backgroundColor = theme['--background-darker'];

}

const setupColorEditor = () => {
    const editor = document.getElementById('theme-editor');
    editor.className = defaults.includes(state.current.id) ? 'editor-disabled' : 'editor';

    Object.keys(state.current.theme.colors).forEach(key => {
        const formElement = document.createElement('form');
        const labelElement = document.createElement('label');
        labelElement.textContent = key;

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.id = `${key}.color`;
        colorInput.name = 'color';

        const opacityInput = document.createElement('input');
        opacityInput.type = 'number';
        opacityInput.id = `${key}.opacity`;
        opacityInput.name = 'opacity';

        formElement.addEventListener('change', async (e) => {
            const form = e.target.parentNode;
            const key = (e.target.id).split('.')[0];
            const raw = hexToRgb(form['color'].value, form['opacity'].value);
            const value = `rgba(${raw.r}, ${raw.g}, ${raw.b}, ${raw.a})`;

            await editThemeColors(state.current.id, key, value);

            state.current.theme.colors[key] = value;

            loadThemePreview(state.current.id, state.current.theme.colors);
            loadTheme(state.current.theme);

        });

        formElement.appendChild(labelElement);
        formElement.appendChild(colorInput);
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
        opacityInput.value = r[3] * 100;

        console.log(opacityInput);
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

    preview.style.filter = filter;

    Object.keys(state.current.theme.background).forEach(key => {
        const input = document.getElementById(key);
        input.value = state.current.theme.background[key];
    });
}
