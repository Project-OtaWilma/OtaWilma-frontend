import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './compontents/App/App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <div className='disclaimer'><div className='icon' /><h1>Otawilman selainversio on saatavilla vain laitteille, joiden näytön resoluutio on yli 900px kertaa 600px. Jos olet koulun koneella, kokeile zoomata ulos pari kertaa näppäinyhdistelmää <strong>"[ctrl] ja [-]"</strong></h1></div>
        <div className='container'>
            <div className='background'></div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
