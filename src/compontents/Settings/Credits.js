import React, { useState, useEffect } from 'react';

import styles from './Settings.module.css'

export default function Credits() {

    return (
        <>
            <div className={styles['credits-container']}>
                <h1 className={styles['title']} id='credits'>Kiitokset</h1>
                <div className={styles['credits']}>
                    <h1>Niklas Halonen</h1>
                    <h3>"OtaWilman frontend olisi varmaan vieläkin kirjoitettu ghetto-Reactilla(TM) ilman 'motivointiasi'"</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Matias Swinger</h1>
                    <h3>"Otit Wilmassa kärsivällisesti vastaan rajapinnan kehityksestä aiheutuneita kryptisiä testausviestejä pitkin kesälomaa hyvin hämäriin kellonaikoihin."</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Matti Heikkinen</h1>
                    <h3>"Autoit epätoivoisissa yrityksissa ottaa yhteyttä Vismaan. Yritysten epäonnistumisesta huolimatta olit innolla mukana projektissa."</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Teppo Multimäki</h1>
                    <h3>"Vaikka et varsinaisesti puskenut yhtäkään riviä koodia lähdekoodiin, päädyit silti olemaan hyödyllisin koko testaustiimistä. Onnistuit myös valittamaan eniten kaikeista projektissa mukana olleista."</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Jere Hasu</h1>
                    <h3>"Antamastasi 'rakentavasta haukkumisesta' oli todella paljon hyötyä. Olet myös syyllinen siihen, että OtaWilma on saatavilla myös vanhalla opintosuunnitelmalla opiskeleville abeille."</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Ville Kujala</h1>
                    <h3>"Onnistuit puskemaan lähdekoodin yhden rivin koodia, joka lopulta ei oikeastaan edes toiminut. Olit kuitenkin ensimmäinen lähdekoodia muokannut henkilö, oli muokkaus sitten positiivinen tai negatiivinen."</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Ville Hynninen</h1>
                    <h3>"Jotenkin onnistuit löytämään (ja valittamaan) pienimmistä yksityiskohdista, joita kukaan muu tuskin olisi koskaan edes huomannut."</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Ahti Olvio</h1>
                    <h3>"Olet yksin ainoa henkilö, joka on koskaan kurssivalinnoillaan tuonut OtaWilman julkisen rajapinnan alas. Onnittelut"</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Leo Jussila</h1>
                    <h3>"Onnistui kehityksen aikana monistumaan useampaankin otteeseen"</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Minttu Poijärvi</h1>
                    <h3>"Onnistuit haittaamaan ja vaikeuttamaan kehitystä ”pspsps”-viestejen avulla"</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Joonas Karjalainen</h1>
                    <h3>"Oppilas joka halusi päästä lopputeksteihin, ei muuta."</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Simo Naatula</h1>
                    <h3>"Miksi olen täällä"</h3>
                    <h3>- varmaan Simo</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Kimmo Poijärvi</h1>
                    <h3>"Katan äärimmäisen tyhmä koira"</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Jussi Kaataja</h1>
                    <h3>"Matematiikan opettaja"</h3>
                </div>
                <div className={styles['credits']}>
                    <h1>Täffä</h1>
                    <h3>"Opiskelijaravintola Otaniemessä"</h3>
                </div>
            </div>
            <div className={styles['tester-list']}>
                <h1>Erityiskiitokset mahtavalle testausryhmälle</h1>
                <h3>Elina Leini</h3>
                <h3>Teppo Multimäki</h3>
                <h3>Enna Viinanen</h3>
                <h3>Jere Hasa</h3>
                <h3>Daniel Rautavalta</h3>
                <h3>Minttu Poijärvi (:D)</h3>
                <h3>Ahti Olvio</h3>
                <h3>Vilpus Rainisto</h3>
                <h3>Olavi Tapaninen</h3>
                <h3>Leo Jussila</h3>
                <h3>Ville Kujala</h3>
                <h3>Leevi Virtanen</h3>
                <h3>Severi Lybeck</h3>
                <h3>Ville Hynninen</h3>
                <h3>Armas Walton</h3>
                <h3>Joonas Karjalainen</h3>
                <h3>Sujin Kim</h3>
                <h3>Aleksander Varfolomeev</h3>
                <h3>Pyry Jäppinen</h3>
                <h3>Kasper Malm</h3>
            </div>
        </>
    )
}


