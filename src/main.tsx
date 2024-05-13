import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './store.ts'
import { Provider } from 'react-redux'
import { URLParamsProvider } from './UrlParamsContext.tsx'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <URLParamsProvider>
      <BrowserRouter>
     <Provider store={store}>
     <App />
     </Provider>
     </BrowserRouter>
     </URLParamsProvider>
  </React.StrictMode>,
)
