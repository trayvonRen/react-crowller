import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import LoginPage from './Pages/Login'
import HomePage from './Pages/Home'

export const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Route path="/login" exact component={LoginPage}></Route>
        <Route path="/home" exact component={HomePage}></Route>
      </HashRouter>
    </div>
  )
}
