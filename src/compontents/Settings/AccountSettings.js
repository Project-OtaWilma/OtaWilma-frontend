import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useConfig, getConfig } from '../../features/themes/configSlice';
import { LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';

import styles from './Settings.module.css';
import { generateCode, getTokenList, publishData, removeCode, resetGenerated, useApi, applyCode } from '../../features/api/apiSlice';

export const AccountInfo = ({onCreate}) => {
    const config = useSelector(useConfig);

    const [category, setCategory] = useState('share');
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
    const apply = () => {

    }

    return (
        <div className={styles['sharing']}>
            <PlaceHolder className={styles['sharing-background']}/>
            <h1>Jaa kurssivalinnat kaverille</h1>
            <h3>Kurssivalintojen jakaminen kavereiden kanssa helpottaa kaikille mieleisten valintojen tekemistä. <strong>Valintasi päivittyvät kavereillesi automaattisesti</strong>, ja voit helposti hallinnoida ketkä kaverisi saavat nähdä valintasi.</h3>


            <div className={styles['code-actions']}>
                <GenerateCode />
                <UseCode />
            </div>
        </div>
    )
}

const GenerateCode = () => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const config = useSelector(useConfig);
    const api = useSelector(useApi);


    const [copyText, setCopyText] = useState('');

    if(api.isPublishing || api.isGenerating) return <LoadingScreen className={styles['share-loading-screen']} />

    const share = () => {
        dispatch(generateCode({auth: auth.token}));
        setCopyText('');
    }

    const agree = () => {
        dispatch(publishData({auth: auth.token}));
    }

    const copy = () => {
        navigator.clipboard.writeText(api.generated);
        setCopyText('Kopioitu leikepöydälle');
    }

    return (
        <div className={styles['share']}>
            <h1>Luo kaverikoodi</h1>
            <h2>Lähetä kaverikoodi yhdelle kavereistasi. Voit tarvittaessa luoda lisää ja hallita olemassa olevia kaverikoodeja <strong>Jaettu kurssivalinnat</strong> osiosta</h2>
            
            <form className={config.value['public'] ? styles['agreed'] : null}>
                <input type='checkbox' onChange={() => agree()} checked={config.value['public']}/>
                <h2>Ymmärrän, että jakamalla kurssivalintani <strong>luovutan tiedon kurssivalinnoistani Wilmasta riippumattomalle kolmannelle osapuolelle</strong>. OtaWilmalla ei ole oikeutta jakaa eikä tule jakamaan tietojasi eteenpäin</h2>
            </form>
            
            <div id={config.value['public'] ? null : styles['disabled']} className={styles['generate']}>
                {
                    !api.generated ? 
                    <button onClick={() => share()}>Luo kertakäyttöinen kaverikoodi</button>
                        :
                    <>
                        <h3>{copyText}</h3>
                        <h4 onClick={() => dispatch(resetGenerated())}>Luo lisää kaverikoodeja</h4>
                        <input type='text' value={api.generated} readOnly={true}/>
                        <button onClick={() => copy()} className={styles['copy']} />
                    </>
                }
            </div>
        </div>
    )
}

const UseCode = () => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const api = useSelector(useApi);

    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const apply = () => {
        setError('');
        if(code == '') return setError('Kaverikoodi ei voi olla tyhjä'); 

        dispatch(applyCode({auth: auth.token, hash: code}));
    }

    return (
        <div className={styles['apply']}>
            <h1>Käytä kaverikoodi</h1>
            <h2>Käytä kaverisi luoma kaverikoodi. Kaverisi kurssivalinnat ilmestyvät heti näkyviin <strong>Työjärjestys</strong>-osiossa pieninä kuvakkeina.</h2>
            <form onSubmit={e => {e.preventDefault(); apply()}}>
                <input type='text' placeholder='e2c8a0c21a3d0d519b3be89a' value={code} onChange={e => setCode(e.target.value)} />
            </form>
            {api.status.error ? <h4>{api.status.content}</h4> : <h5>{api.status.content}</h5>}
            {error ? <h4>{error}</h4> : null}
            <button onClick={() => apply()}><h5>Käytä</h5></button>
        </div>  
    )
}


const TokenList = () => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const api = useSelector(useApi);

    const initialize = () => {
        dispatch(getTokenList({auth: auth.token}));
    }

    const remove = (hash) => {
        console.log(hash);
        dispatch(removeCode({auth: auth.token, hash: hash}))
    }

    useEffect(() => initialize(), [])

    return (
        <div className={styles['shared']}>
            <PlaceHolder className={styles['sharing-background']}/>
            <h1>Jaetut kurssivalinnat</h1>
            <h3>Olet jakanut kurssivalintasi alla oleville henkilöille. Näet listalla myös käyttämättömät kaverikoodit.</h3>
            {
                api.tokens.isLoading ? 
                <LoadingScreen className={styles['shared-loading-screen']} />
                    :
                <div className={styles['token-list']}>
                    {
                        api.tokens['content'].map((token, i) => {
                            
                            return <TokenObject key={i} onRemove={() => remove(token['hash'])} token={{username: token['user'], hash: token['hash']}}/>
                        })
                    }
                </div>
            }
        </div>
    )
}

const TokenObject = ({token, onRemove}) => {
    const user = token['username'];
    const hash = token['hash']; 
    const [copyText, setCopyText] = useState('');

    const copy = () => {
        navigator.clipboard.writeText(hash);
        setCopyText('Kopioitu leikepöydälle');
    }

    const color = user ? `var(${randomColor(user)})` : '--error';

    return (
        <div className={styles['token-object']}>
            {
                token['username'] ? 
                <div className={styles['user']}>
                    <h2 style={{backgroundColor: color}}>{shorten(user)}</h2>
                    <h2 style={{color: color}}>{username(user)}</h2>
                </div>
                :
                <>
                    <h3 className={styles['copytext']}>{copyText}</h3>
                    <div className={styles['copyable']}>
                        <input value={hash} readOnly={true}/>
                        <button onClick={() => copy()} className={styles['copy']}/>
                    </div>
                </>
            }
            <h3>{user ? hash : null}</h3>
            {user ? null : <h6>Käyttämätön</h6>}
            <button onClick={onRemove}>Poista</button>
        </div>
    )
}

const randomColor = (raw) => {
    const u = shorten(raw)
    const [f, l] = (new TextEncoder()).encode(u);
    let seed = Math.abs(f + l);
    const x = Math.sin(seed++) * 10000;
    const rnd = x - Math.floor(x);

    return [
        '--L2021-mandatory-main',
        '--L2021-mandatory-selected',
        '--L2021-g-optional-main',
        '--L2021-g-optional-selected',
        '--L2021-l-optional-main',
        '--L2021-l-optional-selected',
        '--L2021-diploma-main',
        '--L2021-diploma-selected',
        '--L2016-l-optional-main',
        '--L2016-g-optional-main',
    ][Math.floor(rnd * 10)];
}
const shorten = (raw) => {
    return username(raw).split(' ').map(s => s[0]).join('');
}
const username = (raw) => {
    return raw.split('.').length > 1 ? [raw.split('.')[0], raw.split('.')[raw.split('.').length - 1]].map(u => `${u.charAt(0).toUpperCase()}${u.slice(1)}`).join(' ') : raw;
}


