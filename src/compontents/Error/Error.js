import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import map from './errors.json';

import styles from './Error.module.css';
import { useErrors } from '../../features/errors/errorSlice';



export default function Error() {
    const dispatch = useDispatch();
    const errors = useSelector(useErrors);

    const error = errors.error;

    const e = (status) => {
        const raw = status ? `${status}` : '500';

        if(!Object.keys(map).includes(raw)) return {
            status: 'React client',
            name: 'Selainpuolen virhe',
            description: 'Sivun lataus epäonnistui tuntemattomista syistä. Ilmoita ongelmasta kehittäjälle'
        }

        return map[raw];
    }

    return (
        <div className={styles['error-container']}>
            <div className={styles['error-image']} />
            <div className={styles['error-object']}>
                <h1>{`${error.status} - ${e(error.status).name}`}</h1>
                <h3>{error.error ? error.error['err'] : 'Lisätietoja ongelmasta ei ole saatavilla'}</h3>
                <h2 dangerouslySetInnerHTML={{__html: e(error.status).description}}></h2>
                <h5>{`${error.status} - ${e(error.status).status}`}</h5>
            </div>
        </div>
    )
}