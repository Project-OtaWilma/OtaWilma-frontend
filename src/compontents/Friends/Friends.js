import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/authentication/authSlice';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Friends.module.css';

import { useConfig, getConfig } from '../../features/themes/configSlice';
import { BlurLayer, LoadingScreen, PlaceHolder } from '../LoadingScreen/LoadingScreen';
import { generateCode, getTokenList, publishData, removeCode, resetGenerated, useApi, applyCode } from '../../features/api/apiSlice';

export default function Friends() {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const config = useSelector(useConfig);
    const [isPublic, setPublic] = useState(false);

    const initialize = () => {
        dispatch(getTokenList({auth: auth.token}));
    }

    useEffect(() => {
        if (!config.isLoading) {
            if (config.value.public) {
                setPublic(true);
                initialize();
            }
        }
    }, [config])


    return (
        <>
            {isPublic ? null : <Agreement isPublic={isPublic} />}
            <BlurLayer className={styles['content']} isLoading={!isPublic} >
                <div className={styles['side-bar']}>
                    <TokenList />
                </div>
                <div className={styles['main']}>
                    <Sharing />
                </div>
            </BlurLayer>
        </>
    )
}

const Agreement = ({ isPublic }) => {
    const dispatch = useDispatch();
    const auth = useSelector(useAuth);
    const config = useSelector(useConfig);
    const api = useSelector(useApi);
    
    const onAgree = () => {
        dispatch(publishData({auth: auth.token}));
    }

    return (
        <div className={styles['agreement']}>
            <h1>Hyväksy käyttöehdot</h1>
            <div className={styles['agreement-form']}>
                <input type='checkbox' onChange={onAgree}/>
                <h2>Ymmärrän, että jakamalla kurssivalintani <strong>luovutan tiedon kurssivalinnoistani Wilmasta riippumattomalle kolmannelle osapuolelle</strong>. OtaWilmalla ei ole oikeutta jakaa eikä tule jakamaan tietojasi eteenpäin</h2>
            </div>
            <PlaceHolder className={styles['background']} />
        </div>
    )
}

const Sharing = () => {
    return (
        <div className={styles['sharing']}>
            <div className={styles['header']}>
                <h1>Jaa kurssivalinnat kaverille</h1>
                <h3>Kurssivalintojen jakaminen kavereiden kanssa helpottaa kaikille mieleisten valintojen tekemistä. <strong>Valintasi päivittyvät kavereillesi automaattisesti</strong>, ja voit helposti hallinnoida ketkä kaverisi saavat nähdä valintasi.</h3>
            </div>


            <div className={styles['code-actions']}>
                <GenerateCode />
                <UseCode />
            </div>
            <PlaceHolder className={styles['sharing-background']} />
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

    const copy = () => {
        navigator.clipboard.writeText(api.generated);
        setCopyText('Kopioitu leikepöydälle');
    }

    if (config.isLoading) return <LoadingScreen className={styles['share-loading-screen']} />;

    return (
        <div className={styles['share']}>
            <h1>Luo kaverikoodi</h1>
            <h2>Lähetä kaverikoodi yhdelle kavereistasi. Voit tarvittaessa luoda lisää ja hallita olemassa olevia kaverikoodeja <strong>Jaettu kurssivalinnat</strong> osiosta</h2>
            
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
    const config = useSelector(useConfig);

    const friends = (api.tokens['content'] ?? []).filter(token => token['user']);
    const unused = (api.tokens['content'] ?? []).filter(token => !token['user']);



    const remove = (hash) => {
        console.log(hash);
        dispatch(removeCode({auth: auth.token, hash: hash}))
    }

    if (config.isLoading) return <LoadingScreen className={styles['shared-loading-screen']} />
    if(!config.value.public) return <></>
    if (api.tokens.isLoading) return <LoadingScreen className={styles['shared-loading-screen']} />

    return (
        <div className={styles['shared']}>
            <div className={styles['header']}>
             <h1>Jaetut kurssivalinnat</h1>
             <h3>Olet jakanut kurssivalintasi alla oleville henkilöille. Näet listalla myös käyttämättömät kaverikoodit.</h3>
            <h4>{`${friends.length} ${friends.length == 1 ? "Kaveria" : "Kaveria"}, ${unused.length} ${unused.length == 1 ? 'Käyttämätön' : 'Käyttämätöntä'}`}</h4>
            </div>
            {
                <div className={styles['token-list']}>
                    <div className={styles['list']}>
                        {
                            api.tokens['content'].map((token, i) => {
                                
                                return <TokenObject key={i} onRemove={() => remove(token['hash'])} token={{username: token['user'], hash: token['hash']}}/>
                            })
                        }
                    </div>
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