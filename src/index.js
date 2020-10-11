import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './app/layout/ScrollToTop';

import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';

const store = configureStore();

const rootEl = document.getElementById('root');

// function render() {
//   ReactDOM.render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>,
//     rootEl
//   );
// }

// if (module.hot) {
//   module.hot.accept('./app/layout/App', function () {
//     setTimeout(render);
//   });
// }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  rootEl
);
