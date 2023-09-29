import React, { useState, useEffect } from 'react';

import styles from './Welcome.module.css';

export default function Welcome() {
    const [page, setPage] = useState(0);

    const pages = [
        <Page1 />,
        <Page2 />,
        <Page3 />,
    ]

    const incerement = () => {
        if (page >= pages.length - 1) return setPage(0)
        setPage(page + 1)
    }

    const decrement = () => {
        if (page <= 0) return setPage(pages.length - 1)
        setPage(page - 1)
    }
    
    const close = () => {
        console.log("E")
    }

    return (
        <div className={styles['content']}>
            <div className={styles['page']}>
                {pages[page]}
            </div>
            <div>
                <Controls inc={incerement} dec={decrement} page={page} pages={pages} close={close} />
            </div>
        </div>
    )
}

const Controls = ({inc, dec, pages, page, close}) => {

    return (
        <div className={styles['controls']}>
            <button onClick={dec}>{"<"}</button>
            <div className={styles['dots']}>
                {pages.map((p, i) => <div className={`${styles['dot']} ${i == page ? styles['active'] : ''}`}></div>)}
            </div>
            <button onClick={inc}>{">"}</button>
            <button className={styles['close']} onClick={close}>{"Sulje"}</button>
        </div>
    )
}

const Page1 = () => {
    return (
        <h1>page1</h1>
    )
}

const Page2 = () => {
    return (
        <h1>page2</h1>
    )
}

const Page3 = () => {
    return (
        <h1>page3</h1>
    )
}