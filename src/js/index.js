import '../css/index.css'
import data from '../data.xml'

// import _ from 'loadsh'

import print from './print.js'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

document.write('test1')

document.write(JSON.stringify(data))

// print()
console.log(_.join(['index', 'moudle', 'loaded!']))

