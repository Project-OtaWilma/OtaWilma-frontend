import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig, getConfig } from '../../features/themes/configSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';

import styles from './Settings.module.css';

export const AccountInfo = ({onCreate}) => {
    const config = useSelector(useConfig);

    const [category, setCategory] = useState('shared');
    const [code, setCode] = useState(null);
    const [copyText, setCopyText] = useState('');

    const share = () => {
        setCode('e2c8a0c21a3d0d519b3be89a')
    }

    const apply = () => {

    }

    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopyText('Kopioitu leikepöydälle');
    }

    if(config.isLoading) return <>Loading...</>

    return (
        <>
            <h1 className={styles['title']}>Kaverit ja kurssivalintojen jakaminen</h1>
            <div className={styles['sharing-menu']}>
                <h5 onClick={() => setCategory('share')} className={category == 'share' ? styles['c-selected'] : null}>Jaa kaverille</h5>
                <h5 onClick={() => setCategory('shared')} className={category == 'shared' ? styles['c-selected'] : null}>Jaetut kurssivalinnat</h5>
            </div>
            {category == 'share' ? <Sharing /> : <TokenList />}
        </>
    )
}

const Sharing = () => {
    const [code, setCode] = useState(null);
    const [copyText, setCopyText] = useState('');

    const share = () => {
        setCode('e2c8a0c21a3d0d519b3be89a')
    }

    const apply = () => {

    }

    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopyText('Kopioitu leikepöydälle');
    }

    return (
        <div className={styles['sharing']}>
            <PlaceHolder className={styles['sharing-background']}/>
            <h1>Jaa kurssivalinnat kaverille</h1>
            <h3>Kurssivalintojen jakaminen kavereiden kanssa helpottaa kaikille mieleisten valintojen tekemistä. <strong>Valintasi päivittyvät kavereillesi automaattisesti</strong>, ja voit helposti hallinnoida ketkä kaverisi saavat nähdä valintasi.</h3>


            <div className={styles['code-actions']}>
                <div className={styles['share']}>
                    <h1>Luo kaverikoodi</h1>
                    <h2>Lähetä kaverikoodi yhdelle kavereistasi. Voit tarvittaessa luoda lisää ja hallita olemassa olevia kaverikoodeja <strong>Jaettu kurssivalinnat</strong> osiosta</h2>
                    <form>
                        <input type='checkbox' />
                        <h2>Ymmärrän, että jakamalla kurssivalintani <strong>luovutan tiedon kurssivalinnoistani Wilmasta riippumattomalle kolmannelle osapuolelle</strong>. OtaWilmalla ei ole oikeutta jakaa eikä jaa tietojasi eteenpäin</h2>
                    </form>
                    <div className={styles['generate']}>
                        {
                            !code ? 
                            <button onClick={() => share()}>Luo kertakäyttöinen kaverikoodi</button>
                                :
                            <>
                                <h3>{copyText}</h3>
                                <h4 onClick={() => setCode(null)}>Luo lisää kaverikoodeja</h4>
                                <input type='text' value={code} readOnly={true}/>
                                <button onClick={() => copy()} className={styles['copy']} />
                            </>
                        }
                    </div>
                </div>
                <div className={styles['apply']}>
                    <h1>Käytä kaverikoodi</h1>
                    <h2>Käytä kaverisi luoma kaverikoodi. Kaverisi kurssivalinnat ilmestyvät heti näkyviin <strong>Työjärjestys</strong>-osiossa pieninä kuvakkeina.</h2>
                    <form onSubmit={() => apply()}>
                        <input type='text' placeholder='e2c8a0c21a3d0d519b3be89a' />
                    </form>
                    <h4></h4>
                    <button onClick={() => apply()}><h5>Käytä</h5></button>
                </div>  
            </div>
        </div>
    )
}

const TokenList = () => {
    return (
        <div className={styles['shared']}>
            <PlaceHolder className={styles['sharing-background']}/>
            <h1>Jaetut kurssivalinnat</h1>
            <h3>Olet jakanut kurssivalintasi alla oleville henkilöille. Näet listalla myös käyttämättömät kaverikoodit.</h3>
            <div className={styles['token-list']}>
                <div className={styles['token-object']}>
                    <div className={styles['user']}>
                        <h2>TM</h2>
                        <h2>Tuukka Moilanen</h2>
                    </div>
                    <h3>e2c8a0c21a3d0d519b3be89a</h3>
                    <button>Poista</button>
                </div>
                <div className={styles['token-object']}>
                    <div className={styles['user']}>
                        <h2>TM</h2>
                        <h2>Teppo Multimäki</h2>
                    </div>
                    <h3>e2c8a0c21a3d0d519b3be89a</h3>
                    <button>Poista</button>
                </div>
                <div className={styles['token-object']}>
                    <div className={styles['copyable']}>
                        <input value={'e2c8a0c21a3d0d519b3be89a'} readOnly={true}/>
                        <button className={styles['copy']}/>
                        <h3>{'Kopioitu leikepöydälle'}</h3>
                    </div>
                    <h6>Käyttämätön</h6>
                    <button>Poista</button>
                </div>
                <div className={styles['token-object']}>
                    <div className={styles['user']}>
                        <h2>TM</h2>
                        <h2>Teppo Multimäki</h2>
                    </div>
                    <h3>e2c8a0c21a3d0d519b3be89a</h3>
                    <button>Poista</button>
                </div>
            </div>
        </div>
    )
}

const duration = (raw) => {
    const h = (Math.abs(( new Date()) - (new Date(raw))) / 36e5) * 60;
    const hours = (h / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    if(rhours == 0) return `${rminutes}min sitten`;

    return `${rhours}h ${rminutes}min sitten`;
}

const date = (raw) => {
    return (new Date(raw)).toLocaleDateString('Fi-fi')
}

const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}


