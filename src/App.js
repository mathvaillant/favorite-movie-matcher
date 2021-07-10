import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Options from './components/Options/Options'
import Spinner from './components/Spinner/Spinner'
import './App.scss'

const Home = React.lazy(() => import('./screens/Home'))
const Likes = React.lazy(() => import('./screens/Likes'))
const Dislikes = React.lazy(() => import('./screens/Dislikes'))

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={Home} />
            <Route path='/likes' component={Likes} />
            <Route path='/dislikes' component={Dislikes} />
          </Suspense>
        </Switch>
        <Options />
      </Router>
    </div>
  )
}

export default App
