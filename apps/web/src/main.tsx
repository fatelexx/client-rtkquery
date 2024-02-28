import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ApiProvider,
} from '@reduxjs/toolkit/query/react'

import { catApi } from './api';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ApiProvider api={catApi}>
      <App />
    </ApiProvider>
  </StrictMode>
);
