import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import {Provider} from "react-redux";
import {setupStore} from "./app/providers/store/Store.ts";
import '@shared/i18n/i18n.ts';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </StrictMode>,
)
