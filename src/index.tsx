import './index.css';

import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

import { App } from './app';
import { HelmetProvider } from 'react-helmet-async';

const element = document.getElementById('root');

if (element) {
  ReactDOM.createRoot(element).render(
    <RecoilRoot>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </RecoilRoot>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
