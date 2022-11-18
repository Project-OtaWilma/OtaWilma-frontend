import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig, getConfig } from '../../features/themes/configSlice';
import { useThemes, loadTheme, getThemeList, setTheme, createTheme, selectTheme, editTheme} from '../../features/themes/themeSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';

import settings from './settings.json';

import styles from './Settings.module.css';

const imageTypes = ['png', 'svg', 'jpg', 'gif', 'webp'];

export default function Settings() {
    const [window, setWindow] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const themes = useSelector(useThemes);

    const initialize = () => {
        console.log('Ready!');
        dispatch(getThemeList({auth: auth.token}))
    }

    
    const loadThemes = () => {
        themes.list['content'].forEach(hash => {
            dispatch(loadTheme({auth: auth.token, id: hash}))
        });
    }

    const create = (preset) => {
        setWindow(false);
        dispatch(createTheme({auth: auth.token, preset: preset}));
    }
    

    // componentDidMount
    useEffect(() => { initialize() }, []);

    // themeListDidLoad
    useEffect(() => { if(!themes.list.isLoading) return loadThemes() }, [themes.list.isLoading]);

    return (
        <>
            {window ? <ThemeWindow onClose={() => setWindow(false)} onCreate={(preset) => create(preset)}/> : null}
            <div className={styles['content']} style={{filter: window ? 'blur(3px)': 'none', pointerEvents: window ? 'none' : 'all'}}>
                <div className={styles['side-bar']}>
                    <h1>Teemat</h1>

                    <h1>Käyttäjä ja kaverit</h1>

                    <h1>Kehittäjälle</h1>

                    <h1>Kiitokset</h1>
                </div>
                <div className={styles['settings-content']}>
                    <div className={styles['colors']}>
                        <ThemeList onCreate={() => setWindow(true)}/>
                        <ColorEditor />
                    </div>
                    <div className={styles['backgrounds']}>
                        <BackgroundEditor />
                    </div>
                </div>
                <div className={styles['settings-help']}>
                <div className={styles['info']}>
                        <h1>OtaWilma asetukset</h1>
                        <h2>Teemat</h2>
                        <h3>Voit valita oletusteemojen väliltä ja luoda halutessasi myös omia teemoja. Tehokkaalla
                            editorilla voit mukauttaa Wilmasi värejä sekä taustakuvia.
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )
}

const ThemeList = ({onCreate}) => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth)
    const themes = useSelector(useThemes);
    const list = themes.list;
    const map = themes.themes;
    const current = themes.current;
    
    if(list.isLoading) return <>Loading...</>
    if(Object.keys(map).map(h => map[h].isLoading).filter(n => n).length != 0) return <>Loading...</>

    const select = (id) => {
        dispatch(selectTheme({auth: auth.token, id: id}))
    }
    
    return (
        <>
            <h1>Teemat</h1>
            <div className={styles['theme-list']}>
                {
                    list['content'].filter(h => ['light', 'dark'].includes(h)).map((hash, i) => {
                        const theme = map[hash];
                        return <ThemePreviewObject key={i} theme={theme} selected={theme.hash == current} onLoad={() => select(hash)}/>
                    })
                }
            </div>
            <h1>Omat teemasi</h1>
            <h3>{`${list['content'].length - 2} / 25`}</h3>
            <div className={styles['theme-list']}>
                {
                    list['content'].filter(h => !['light', 'dark'].includes(h)).map((hash, i) => {
                        const theme = map[hash];
                        return <ThemePreviewObject key={i} theme={theme} selected={theme.hash == current} onLoad={() => select(hash)}/>
                    })
                }
                <div 
                    onClick={() => onCreate()}
                    className={styles['theme']}
                >
                    <div className={styles['theme-new']}>
                        <h3>Luo teema</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

const ThemePreviewObject = ({theme, selected, onLoad}) => {

    return (
        <div
        onClick={() => onLoad()}
            className={selected ? `${styles['theme']} ${styles['selected']}` : styles['theme']}
            style={{
                borderTop: `10px solid ${theme['colors']['--accent-main'].value}`
            }}
        >
            <div 
                className={styles['theme-background']}
                style={{
                    background: theme['background']['url'].value ? `url(${theme['background']['url'].value})` : theme['colors']['--background-main'].value,
                    filter: filter(theme)
                }} />
            <div 
                className={styles['theme-main']}
                style={{
                    backgroundColor: theme['colors']['--background-main'].value,
                    boxShadow: `0px 0px 10px ${theme['colors']['--shadow-main'].value}`,
                    borderLeft: `solid 2px ${theme['colors']['--accent-main'].value}`
                }}>
                <h1
                    style={{
                        color: theme['colors']['--font-h1'].value
                    }}>
                    OtaWilma
                </h1>
                <h2
                    style={{
                        color: theme['colors']['--font-h2'].value
                    }}>
                    Teema
                </h2>
            </div>
            <h6>Nykyinen</h6>
        </div>
    )
}

const ThemeWindow = ({onClose, onCreate}) => {
    const themes = useSelector(useThemes);
    const map = themes.themes;

    if(!map['light'] || !map['dark']) return <>loading</>
    if(map['light'].isLoading || map['dark'].isLoading) return <>loading</>

    return (
        <div className={styles['theme-window']}>
            <h1 className={styles['title']}>Luo uusi teema</h1>
            <PlaceHolder className={styles['window-background']}/>
            <h3>Voit aloittaa oman teeman luomisen joko vaaleasta tai tummasta pohjasta.</h3>
            <div className={styles['theme-list']}>
                <ThemePreviewObject theme={map['light']} onLoad={() => onCreate('light')}/>
                <ThemePreviewObject theme={map['dark']} onLoad={() => onCreate('dark')}/>
            </div>
            <button onClick={() => onClose()}>Peruuta</button>
        </div>
    )
}

const ColorEditor = () => {
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    if(!theme) return <></>
    if(['dark', 'light'].includes(theme.hash)) return <EditorDisclaimer />
    if(theme.isLoading) return <>Loading...</>

    return (
        <>
            <h1>Muokkaa teemaa</h1>
            <div className={styles['sections']}>
                {
                    Object.keys(settings['colors']).map((category, i) => {
                        return <SettingsCategory key={i} type={'colors'} category={category} o={i == 0}/>
                    })
                }
            </div>
        </>
    )
}

const EditorDisclaimer = () => {
    return (
        <div className={styles['editor-disclaimer']}>
            <PlaceHolder className={styles['disclaimer-background']} />
            <h6>Valitse oma teema avataksesi kaikki editorin ominaisuudet.</h6>
        </div>
    )
}

const BackgroundEditor = () => {
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    const [background, setBackground] = useState(theme && !theme.isLoading ? theme['background']['url'].value : '');
    const [error, setError] = useState('');
    const [format, setFormat] = useState('');

    if(!theme) return <></>
    if(['dark', 'light'].includes(theme.hash)) return null
    if(theme.isLoading) return <>Loading...</>

    const updateBackground = async (url) => {
        if(url.length > 2023) return setError('linkin tulee olla alle <strong>1024</strong> merkin pituinen')
        if(error) setError('');

        checkFormat(url).catch(() => {setError("linkin tulee olla <strong>kuvatiedosto</strong>")})

        setBackground(url);
    }

    const checkFormat = (url) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+'((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+'(\\?[;&a-z\\d%_.~+=-]*)?'+ '(\\#[-a-z\\d_]*)?$','i');
        
        return new Promise((resolve, reject) => {
            if(!url) return reject();
            if(!urlPattern.test(url)) return reject();
            const img = new Image();
            img.src = url;
            img.onload = (e) => {
                const a = document.createElement('a');
                a.href = url;
                const format = a.pathname.split('.').reverse()[0];
                setFormat(imageTypes.includes(format) ? format : '?');
                a.remove();
                img.remove();
                return resolve();
            };
            img.onerror = (e) => {
                setFormat('?')
                img.remove();
                return resolve();
            }
        })
    }
    
    return (
        <>
            <h1>Taustakuva</h1>
            <h1>Esikatselu</h1>
            <div className={styles['preview']}>
                <img src={background ? background : ''} />
            </div>
            <>
                <h1>Valitse taustakuva</h1>
                <form className={styles['background-input']}>  
                    <label>Linkki</label>
                    <input type='url' value={background} onChange={(e) => updateBackground(e.target.value)} placeholder='https://onlyfans.com/?img=minttu.png'/>
                    <h4 dangerouslySetInnerHTML={{__html: error}}></h4>
                </form>
                <div className={styles['format-disclaimer']}>
                    <h3 style={{color: format== '?' ? 'var(--error)' : 'var(--login-main)'}}>{format}</h3>
                </div>
                <h1>Muokkaa taustakuvaa</h1>
                <div className={styles['sections']}>
                {
                    Object.keys(settings['background']).map((category, i) => {
                        return <SettingsCategory key={i} type={'background'} category={category} o={i == 0}/>
                    })
                }
            </div>
            </>
        </>
    )
}

const SettingsCategory = ({type, category, o}) => {
    const themes = useSelector(useThemes);
    const theme = themes.theme;
    const [open, setOpen] = useState((o ? true : false));
    const list = settings[type][category];

    return (
        <>
            <div 
            className={styles['section-title']}
            onClick={() => setOpen(!open)}>
                <h1>{category}</h1>
                <h2 className={styles['icon']}>{open ? 'Sulje' : 'Avaa'}</h2>
            </div>
            <div className={styles['section']} style={{
                display: open ? 'flex' : 'none'
            }}>
                {
                    Object.keys(list).map((key, i) => {
                        const setting = theme[type][key];
                        switch(setting['type']) {
                            case 'color':
                                return <ColorInput key={i} field={list[key]} k={key} setting={setting} />
                            default:
                                return <NumberInput key={i} field={list[key]} k={key} setting={setting} />
                        }
                    })
                }
            </div>
        </>
    )
}

const ColorInput = ({field, setting, k: key}) => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const themes = useSelector(useThemes)
    const [r, g, b, a] = parseRgb(setting.value);
    const [color, setColor] = useState(rgbToHex(r, g, b))
    const [opacity, setOpacity] = useState(a * 100);

    const updateOpacity = (a) => {
        const o = Math.min(Math.max(a, 0), 100);
        setOpacity(o);
    }
    
    
    const updateColor = (c) => {
        setColor(c)
    }

    const applyColor = () => {
        const {r, g, b, a} = hexToRgb(color, opacity / 100)
        const raw = `rgba(${r}, ${g}, ${b}, ${a})`;

        
        dispatch(editTheme({
            auth: auth.token,
            id: themes.current,
            root: 'colors',
            key: key,
            value: raw
        }));
        
    }

    return (
        <form onSubmit={(e) => {e.preventDefault(); applyColor()}}>
            <label>{field}</label>
            <h3>{'Väri'}</h3>
            <input className={styles['color-input']} type='color' style={{opacity: opacity / 100}} onBlur={() => applyColor()} value={color} onChange={(e) => updateColor(e.target.value)}/>
            <div className={styles['opacity']}>
                <h3>Läpinäkyvyys</h3>
                <input className={styles['opacity-input']} type='number' value={opacity} onBlur={() => applyColor()} onChange={(e) => updateOpacity(e.target.value)}/>
            </div>
        </form>
    )
}

const NumberInput = ({field, setting}) => {
    const [value, setValue] = useState(setting['value']);

    const updateValue = (v) => {
        const val = Math.min(Math.max(v, 0), 200);
        setValue(val);
    }

    return (
        <form>
            <label>{field}</label>
            <input className={styles['number-input']} type='number' onChange={(e) => updateValue(e.target.value)} value={value} />
        </form>
    )
}

const hexToRgb = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: opacity
    } : null;
}

const rgbToHex = (r, g, b) => '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
const parseRgb = (input) => input.split("(")[1].split(")")[0].split(",").map(c => Number.parseFloat(c));

const filter = (theme) => `blur(${theme.background.blur.value}px)
     opacity(${theme.background.opacity.value}%)
    brightness(${theme.background.brightness.value}%)
    contrast(${theme.background.contrast.value}%)
    saturate(${theme.background.saturate.value}%)
    grayscale(${theme.background.grayscale.value}%)
    sepia(${theme.background.sepia.value}%)
    hue-rotate(${theme.background['hue-rotate'].value}deg)
    invert(${theme.background.invert.value}%)`


