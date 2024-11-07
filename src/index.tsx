import 'bootstrap/dist/css/bootstrap.css'
import 'styles/scss/custom-typography.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'stores/store'

export const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
