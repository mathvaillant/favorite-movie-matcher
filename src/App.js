/* eslint-disable react/react-in-jsx-scope */

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './screens/Home'
import Options from './components/Options/Options'
import LOGO from './images/logo.png'
import './App.scss'
import Likes from './screens/Likes'
import Dislikes from './screens/Dislikes'

function App() {
  return (
    <div className='App'>
      <Router>
        <img className='logo' width='50px' height='50px' src={LOGO} alt='' />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/likes' component={Likes} />
          <Route path='/dislikes' component={Dislikes} />
        </Switch>
        <Options />
      </Router>
    </div>
  )
}

export default App
