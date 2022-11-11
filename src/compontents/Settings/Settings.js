import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig, getConfig } from '../../features/themes/configSlice';
import { useThemes, loadTheme, getThemeList, setTheme } from '../../features/themes/themeSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';

import settings from './settings.json';

import styles from './Settings.module.css';

export default function Settings() {
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
    

    // componentDidMount
    useEffect(() => { initialize() }, []);

    // themeListDidLoad
    useEffect(() => { if(!themes.list.isLoading) return loadThemes() }, [themes.list.isLoading]);

    return (
        <div className={styles['content']}>
            <div className={styles['side-bar']}>
                <h1>Teemat</h1>

                <h1>Käyttäjä ja kaverit</h1>

                <h1>Kehittäjälle</h1>

                <h1>Kiitokset</h1>
            </div>
            <div className={styles['settings-content']}>
                <div className={styles['colors']}>
                    <ThemeList />
                    <ColorEditor />
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
    )
}

const ThemeList = () => {
    const themes = useSelector(useThemes);
    const list = themes.list;
    const map = themes.themes;
    const current = themes.current;
    
    if(list.isLoading) return <>Loading...</>
    if(Object.keys(map).map(h => map[h].isLoading).filter(n => n).length != 0) return <>Loading...</>

    
    return (
        <>
            <h1>Teemat</h1>
            <div className={styles['theme-list']}>
                {
                    list['content'].filter(h => ['light', 'dark'].includes(h)).map((hash, i) => {
                        const theme = map[hash];
                        return <ThemePreviewObject key={i} theme={theme} selected={theme.hash == current}/>
                    })
                }
            </div>
            <h1>Omat teemasi</h1>
            <h3>{`${list['content'].length - 2} / 25`}</h3>
            <div className={styles['theme-list']}>
                {
                    list['content'].filter(h => !['light', 'dark'].includes(h)).map((hash, i) => {
                        const theme = map[hash];
                        return <ThemePreviewObject key={i} theme={theme} selected={theme.hash == current} />
                    })
                }
            </div>
        </>
    )
}

const ThemePreviewObject = ({theme, selected}) => {
    const dispatch = useDispatch();

    return (
        <div
        onClick={() => dispatch(setTheme({id: theme.hash}))}
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

const ColorEditor = () => {
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    if(!theme) return <></>
    if(theme.isLoading) return <>Loading...</>

    return (
        <>
            <h1>Muokkaa teemaa</h1>
            <div className={styles['sections']}>
                {
                    Object.keys(settings).map((category, i) => {
                        return <SettingsCategory key={i} category={category} />
                    })
                }
            </div>
        </>
    )
}

const SettingsCategory = ({category}) => {
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    const [open, setOpen] = useState(false);
    const list = settings[category];

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
                        const setting = theme['colors'][key];
                        switch(setting['type']) {
                            case 'color':
                                return <ColorInput key={i} field={list[key]} setting={setting} />
                            default:
                                return <></>
                        }
                    })
                }
            </div>
        </>
    )
}

const ColorInput = ({field, setting}) => {
    const [r, g, b, a] = parseRgb(setting.value);
    const [color, setColor] = useState(rgbToHex(r, g, b))
    const [opacity, setOpacity] = useState(a * 100);

    const updateOpacity = (a) => {
        const o = Math.min(Math.max(a, 0), 100);
        setOpacity(o);
    }

    const updateColor = (c) => {

    }

    return (
        <form>
            <label>{field}</label>
            <h3>{'Väri'}</h3>
            <input className={styles['color-input']} type='color' style={{opacity: opacity / 100}} value={color} onChange={(e) => updateColor(e.target.value)}/>
            <div className={styles['opacity']}>
                <h3>Läpinäkyvyys</h3>
                <input className={styles['opacity-input']} type='number' value={opacity} onChange={(e) => updateOpacity(e.target.value)}/>
            </div>
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


