import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Login from './components/Login'
import Customers from './components/Customer'
import CustomerDetail from './components/CustomerDetail'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <div className="mb-5">
            <NavLink
              className="link"
              to="/customers"
              activeStyle={{
                fontWeight: 'bold',
                color: 'red'
              }}
            >
              Customer
            </NavLink>
            <NavLink
              activeStyle={{
                fontWeight: 'bold',
                color: 'red'
              }}
              className="link"
              to="/login"
            >
              login
            </NavLink>
          </div>

          <Switch>
            <Route path="/customers" exact={true}>
              <Customers />
            </Route>

            <Route path="/login" exact={true}>
              <Login />
            </Route>

            <Route path="/customers/:id/detail" exact={true}>
              <CustomerDetail />
            </Route>

            <Redirect to="/customers" exact={true} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
