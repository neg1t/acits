import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import useRoutes from './routes';

let App = ({isAuth}) => {

  const [auth, setAuth] = useState(false)
  const routes = useRoutes(auth)

  useEffect(() => {
    setAuth(isAuth)
  }, [isAuth])

  return (
    <Router>
      {auth && (
        <Header />
      )}
      {routes}
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.reducer.isAuth
  }
}

export default App = connect(mapStateToProps)(App);
