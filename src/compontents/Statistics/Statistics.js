import React, { useEffect } from 'react';
import styles from './Statistics.module.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend,
    BarController,
    BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getLatest, getHourly, useStatistics, getRequests, getRequestsWeekday } from '../../features/statistics/statisticsSlice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement,
);


export default function Statistics() {
    const dispatch = useDispatch();

    const initialize = () => {
        dispatch(getHourly());
        dispatch(getRequests());
        dispatch(getRequestsWeekday());
    }

    useEffect(() => {
        initialize();

        return () => {  }

    }, []);

    return (
        <div className={styles['content']}>
            <div className={styles['left']}>

            </div>
            <div className={styles['right']}>
                <div className={styles['top-decoration']}>

                </div>
                <div className={styles['statistics']}>
                    <div className={styles['timings']}>
                        <StatisticsHourly />
                    </div>
                    <div className={styles['percentage']}>
                        <ErrorPercetageHourly />
                    </div>
                    <div className={styles['requests']}>
                        <RequestsDaily />
                    </div>
                    <div className={styles['requests-weekday']}>
                        <RequestsWeekdayDaily />
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatisticsHourly() {
    const statistics = useSelector(useStatistics);
    const { hourly } = statistics;

    if (hourly.isLoading) return <>loading...</>

    const options = {
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true
        },
        plugins: {
            legend: {
                position: 'top',
                
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (item) =>
                        `${item.dataset.label}: ${item.formattedValue}ms`,
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (val) => {
                        if (val > 1000) return `${Math.floor(val / 1000)}s`
                        return `${val}ms`
                    }
                },
            }
        }
    };

    const data = {
        labels: hourly.data.map(e => new Date(e.timeStamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Wilman vastausaika',
                data: hourly.data.map(e => e.averageHandleTime),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 10,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)'
            },
            {
                label: 'min',
                data: hourly.data.map(e => e.minMaxHandleTime[0]),
                borderColor: 'rgba(255, 99, 132, 0.3)',
                backgroundColor: 'rgba(255, 99, 132, 0.3',
                pointRadius: 0,
            },
            {
                label: 'max',
                data: hourly.data.map(e => e.minMaxHandleTime[1]),
                borderColor: 'rgba(255, 99, 132, 0.3)',
                backgroundColor: 'rgba(255, 99, 132, 0.3',
                pointRadius: 0,
            },

            {
                label: 'OtaWilman käsittelyaika',
                data: hourly.data.map(e => e.averageProcessTime),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 1)',
                pointRadius: 10,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)'
            },
            {
                label: 'min',
                data: hourly.data.map(e => e.minMaxProcessTime[0]),
                borderColor: 'rgba(53, 162, 235, 0.3)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
                pointRadius: 0
            },
            {
                label: 'max',
                data: hourly.data.map(e => e.minMaxProcessTime[1]),
                borderColor: 'rgba(53, 162, 235, 0.3)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
                pointRadius: 0,
            },
        ],
    };
    

    return (
        <Line options={options} data={data}/>
    )
}

function ErrorPercetageHourly() {
    const statistics = useSelector(useStatistics);
    const { hourly } = statistics;

    if (hourly.isLoading) return <>loading...</>

    const options = {
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true
        },
        plugins: {
            legend: {
                position: 'top',
                
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (item) =>
                        `${item.dataset.label}: ${item.formattedValue}%`,
                },
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                max: 100,
                beginAtZero: true,
                ticks: {
                    callback: (val) => `${val}%`
                },
            }
        }
    };

    const data = {
        labels: hourly.data.map(e => new Date(e.timeStamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Pyynnöistö virheisiin johti',
                data: hourly.data.map(e => e.errorPercentage * 100),
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.3)',

                pointRadius: 10,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)'
            },
            {
                label: 'Pyynnöistö onnistui',
                data: hourly.data.map(e => 100 - (e.errorPercentage * 100)),
                fill: true,
                borderColor: 'rgba(53, 162, 235, 0.3)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',

                pointRadius: 10,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)'
            }
        ],
    };
    

    return (
        <Line options={options} data={data}/>
    )
}

function RequestsDaily() {
    const statistics = useSelector(useStatistics);
    const { requests } = statistics;

    if (requests.isLoading) return <>loading...</>

    console.log(requests);

    
    const options = {
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true
        },
        plugins: {
            legend: {
                position: 'top',
                
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (item) =>
                        `${item.dataset.label}: ${item.formattedValue}`,
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (val) => {
                        if (val > 1000) return `${Math.floor(val / 1000)}k`
                        return `${val}`
                    }
                },
            }
        }
    };

    const data = {
        labels: requests.data.map(e => new Date(e.date).toLocaleDateString('FI-fi', { 'weekday': 'short', 'day': 'numeric', 'month': 'numeric'})),
        datasets: [
            {
                label: 'Päivittäisten pyyntöjen määrä',
                data: requests.data.map(d => d.totalRequests),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.3)',
                tension: 0.2,
                pointRadius: 10,
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointBorderColor: 'rgba(0, 0, 0, 0)'
            }
        ],
    };
    

    return (
        <Line options={options} data={data}/>
    )
}

function RequestsWeekdayDaily() {
    const statistics = useSelector(useStatistics);
    const { requestsWeekday } = statistics;

    if (requestsWeekday.isLoading) return <>loading...</>

    console.log(requestsWeekday);

    
    const options = {
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true
        },
        plugins: {
            legend: {
                position: 'top',
                
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (item) =>
                        `${item.dataset.label}: ${item.formattedValue}`,
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (val) => {
                        if (val > 1000) return `${Math.floor(val / 1000)}k`
                        return `${val}`
                    }
                },
            }
        }
    };

    const data = {
        labels: [
            'Maanantai',
            'Tiistai',
            'keskiviikko',
            'Torstai',
            'Perjantai',
            'Lauantai',
            'Sunnuntai'
        ],
        datasets: [
            {
                label: 'Keskimääräinen päivittäisten pyyntöjen määrä',
                data: Object.values(requestsWeekday.data),
                borderColor: 'rgba(53, 162, 235, 0.3)',
                backgroundColor: 'rgba(53, 162, 235, 1.0)',
            }
        ],
    };
    

    return (
        <Bar options={options} data={data}/>
    )
}