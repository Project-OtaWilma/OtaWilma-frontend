import {
    fetchJson,
    getCookie,
    removeCache,
    cacheAvailable
} from './utility'

const { wilmaStatusApi } = require('../config.json');


const fetchStatisticsLatest = () => {
    return new Promise((resolve, reject) => {
        fetchJson(`${wilmaStatusApi}/statistics/latest`)
            .then(statistics => {
                return resolve(statistics);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

export {
    fetchStatisticsLatest
}