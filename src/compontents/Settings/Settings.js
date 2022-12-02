import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useThemes, loadTheme, getThemeList, createTheme} from '../../features/themes/themeSlice';
import { BlurLayer } from '../LoadingScreen/LoadingScreen';


import {ThemeList, ThemeWindow, ColorEditor, BackgroundEditor} from './ThemeEditor';
import {AccountInfo} from './AccountSettings';
import styles from './Settings.module.css';
import Credits from './Credits';

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
            <BlurLayer isLoading={window || themes.isEditing || themes.isSelecting} className={styles['content']}>
                <div className={styles['side-bar']}>
                    <h1>Teemat</h1>
                        <h2>Valitse teema</h2>
                            <h3>Vaalea teema</h3>
                            <h3>Tumma teema</h3>
                        <h2>Omat teemat</h2>
                            <h3>valitse oma teema</h3>
                            <h3>Luo oma teema</h3>
                    <h1>Käyttäjä ja kaverit</h1>
                        <h2>Luo kertakäyttöinen kaverikoodi</h2>
                        <h2>Hallitse jaettuja kurssivalintoja</h2> 
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
                    <div className={styles['advanced']}>
                        <Credits />
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
            </BlurLayer>
        </>
    )
}


