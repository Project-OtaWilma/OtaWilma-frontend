import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig, getConfig } from '../../features/themes/configSlice';
import { useThemes, loadTheme, getThemeList, setTheme, createTheme, selectTheme, editTheme} from '../../features/themes/themeSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';

import settings from './settings.json';
import styles from './Settings.module.css';

const imageTypes = ['png', 'svg', 'jpg', 'gif', 'webp'];

export const ThemeList = ({onCreate}) => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth)
    const themes = useSelector(useThemes);
    const list = themes.list;
    const map = themes.themes;
    const current = themes.current;

    
    if(list.isLoading) return <LoadingScreen className={styles['color-loading-screen']} />
    if(Object.keys(map).map(h => map[h].isLoading).filter(n => n).length != 0) return <LoadingScreen className={styles['color-loading-screen']} />

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
                {
                    (list['content'].length - 2) <= 24 ?
                <div 
                    onClick={() => onCreate()}
                    className={styles['theme']}
                >
                    <div className={styles['theme-new']}>
                        <h3>Luo teema</h3>
                    </div>
                </div>
                :
                <></>
                }
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

export const ThemeWindow = ({onClose, onCreate}) => {
    const themes = useSelector(useThemes);
    const map = themes.themes;

    if(!map['light'] || !map['dark']) return <></>
    if(map['light'].isLoading || map['dark'].isLoading) return <></>

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

export const ColorEditor = () => {
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    if(!theme) return <></>
    if(['dark', 'light'].includes(theme.hash)) return <EditorDisclaimer />
    if(theme.isLoading) return <LoadingScreen className={styles['color-loading-screen']} />

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

export const BackgroundEditor = () => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    const [background, setBackground] = useState();
    const [error, setError] = useState('');
    const [format, setFormat] = useState('');
    
    // unsafe [https://fb.me/react-controlled-components] - forcefully update the theme's url after a asyncronous load
    useEffect(() => {if(theme && !theme.isLoading) setBackground(theme['background']['url'].value)}, [theme]);


    if(!theme) return <></>
    if(['dark', 'light'].includes(theme.hash)) return null
    if(theme.isLoading) return <LoadingScreen className={styles['color-loading-screen']} />
    

    const updateBackground = async (url) => {
        if(url.length > 1023) return setError('linkin tulee olla alle <strong>1024</strong> merkin pituinen')
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

    const applyBackground = () => {
        checkFormat(background).catch(() => {setError("linkin tulee olla <strong>kuvatiedosto</strong>"); return;})

        dispatch(editTheme({
            auth: auth.token,
            id: themes.current,
            root: 'background',
            key: 'url',
            value: background
        }));
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
                <form className={styles['background-input']} onSubmit={e => {e.preventDefault(); applyBackground()}}>  
                    <label>Linkki</label>
                    <input type='url' value={background} onChange={(e) => updateBackground(e.target.value)} placeholder='https://onlyfans.com/?img=minttu.png' onBlur={() => applyBackground()}/>
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
                                return <ColorInput key={i} field={list[key]} k={key} />
                            default:
                                return <NumberInput key={i} field={list[key]} k={key} />
                        }
                    })
                }
            </div>
        </>
    )
}

const ColorInput = ({field, k: key}) => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    const [r, g, b, a] = parseRgb(theme['colors'][key].value);
    const [color, setColor] = useState(rgbToHex(r, g, b))
    const [opacity, setOpacity] = useState(a * 100);

    // unsafe [https://fb.me/react-controlled-components] - forcefully update the input after a asyncronous load
    useEffect(() => {
        if(theme && !theme.isLoading) {
            const [r, g, b, a] = parseRgb(theme['colors'][key].value);
            setColor(rgbToHex(r, g, b));
            setOpacity(a * 100);
        }
    }, [theme]);

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

const NumberInput = ({field, k: key}) => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    const [value, setValue] = useState(theme['background'][key].value);

    useEffect(() => {
        if(theme && !theme.isLoading) {
            setValue(theme['background'][key].value);
        }
    }, [theme]);

    const updateValue = (v) => {
        const val = `${Math.min(Math.max(v, 0), 200)}`;
        setValue(val);
    }

    const applyValue = () => {
        dispatch(editTheme({
            auth: auth.token,
            id: themes.current,
            root: 'background',
            key: key,
            value: value
        }));
    }

    return (
        <form onSubmit={e => {e.preventDefault(); applyValue()}}>
            <label>{field}</label>
            <input className={styles['number-input']} type='number' onChange={(e) => updateValue(e.target.value)} onBlur={() => applyValue()} value={value} />
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


