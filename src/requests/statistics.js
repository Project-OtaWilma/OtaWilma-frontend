import {
    fetchJson,
    getCookie,
    removeCache,
    cacheAvailable
} from './utility'

const { wilmaStatusApi } = require('../config.json');


const fetchStatisticsLatest = () => {
    return new Promise((resolve, reject) => {
        fetchJson(`${wilmaStatusApi}/statistics/latest`, { method: 'GET' })
            .then(statistics => {
                return resolve(statistics);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const fetchStatisticsHourly = () => {
    return new Promise((resolve, reject) => {
        fetchJson(`${wilmaStatusApi}/statistics/hourly`, { method: 'GET' })
            .then(statistics => {
                return resolve(statistics);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const fetchStatisticsRequests = () => {
    return new Promise((resolve, reject) => {
        fetchJson(`${wilmaStatusApi}/statistics/requests`, { method: 'GET' })
            .then(statistics => {
                return resolve(statistics);
            })
            .catch(err => {
                return reject(err);
            })
    });
}

const fetchStatisticsRequestsWeekday = () => {
    return new Promise((resolve, reject) => {
        fetchJson(`${wilmaStatusApi}/statistics/requests/weekday`, { method: 'GET' })
            .then(statistics => {
                return resolve(statistics);
            })
            .catch(err => {
                return reject(err);
            })
    });
}



export {
    fetchStatisticsLatest,
    fetchStatisticsHourly,
    fetchStatisticsRequests,
    fetchStatisticsRequestsWeekday
}