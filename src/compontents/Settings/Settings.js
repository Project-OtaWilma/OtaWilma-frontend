import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig, getConfig } from '../../features/themes/configSlice';
import { useThemes, loadTheme, getThemeList, setTheme, createTheme, selectTheme, editTheme} from '../../features/themes/themeSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';


import {ThemeList, ThemeWindow, ColorEditor, BackgroundEditor} from './ThemeEditor';
import {AccountInfo} from './AccountSettings';

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
                    <div className={styles['account']}>
                        <AccountInfo />
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


