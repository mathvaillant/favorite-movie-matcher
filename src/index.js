import React from 'react'
import ReactDOM from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import reportWebVitals from './reportWebVitals'

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 900,
  offset: '50px',
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 100,
  },
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
