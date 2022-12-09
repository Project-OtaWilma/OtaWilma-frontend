import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getConfig, useConfig } from '../../features/themes/configSlice';
import { loadTheme, loadThemeDefault, setTheme, useThemes } from '../../features/themes/themeSlice';
import { useAuth } from '../../features/authentication/authSlice';
import { getVersion } from '../../features/version/versionSlice';

export default function ThemeProvider({ children }) {
    const [background, setBackground] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const config = useSelector(useConfig);
    const themes = useSelector(useThemes);
    const theme = themes.theme;

    const initialize = () => {
        dispatch(getVersion());
        
        if(!auth.token || auth.token === 'null') {
            dispatch(loadThemeDefault({id: 'light'}));
            dispatch(setTheme({id: 'light'}))
            return;
        }
        
        dispatch(getConfig({auth: auth.token}));
    }

    const inititalizeThemes = () => {
        const current = config.value['current-theme'];

        dispatch(loadTheme({auth: auth.token, id: current}));
        dispatch(setTheme({id: current}))
    }

    const renderTheme = () => {
        const id = themes.current;
        const theme = themes.themes[id];

        const root = document.documentElement;
        const colors = Object.keys(theme.colors);
        colors.forEach(key => root.style.setProperty(key.trim(), theme.colors[key].value));
        root.style.setProperty('--background-filter', filter(theme));
        setBackground(theme['background']['url'].value)
    }

    // componentDidMount
    useEffect(() => { initialize() }, []);

    //authDidLoad
    useEffect(() => {if(auth.token && config.isLoading) initialize() }, [auth.token])

    // configDidLoad
    useEffect(() => { if (!config.isLoading && !config.error) inititalizeThemes() }, [config.isLoading]);

    // themeDidChange
    useEffect(() => {if(themes.theme && !themes.theme.isLoading) renderTheme()}, [themes.theme]);

    return (
        <>
            <LoadingScreen active={!theme || theme.isLoading}/>
            <div className='background' style={{background: `url(${background})`}}/>
            {children}
        </>
    )
}

const LoadingScreen = ({active}) => {
    return <div style={{opacity: active ? 100 : 0}} className='loading-screen'></div>
}

const filter = (theme) => `blur(${theme.background.blur.value}px)
     opacity(${theme.background.opacity.value}%)
    brightness(${theme.background.brightness.value}%)
    contrast(${theme.background.contrast.value}%)
    saturate(${theme.background.saturate.value}%)
    grayscale(${theme.background.grayscale.value}%)
    sepia(${theme.background.sepia.value}%)
    hue-rotate(${theme.background['hue-rotate'].value}deg)
    invert(${theme.background.invert.value}%)`