import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Animals from './pages/Animals'
import AuthPage from './pages/AuthPage'
import TodayPage from './pages/TodayPage'

const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Switch>
        <Redirect strict from='/login' to='/today'/>
        <Route path='/today' exact>
          <TodayPage />
        </Route>
        <Route path='/animals' exact>
          <Animals />
        </Route>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/login'>
        <AuthPage />
      </Route>
      <Redirect to='/login' />
    </Switch>
  )
}

export default useRoutes