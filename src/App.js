import React, { Component } from 'react';
import './components/Panel.css';
import EntityRow from './components/EntityRow.js';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import HomeOverview from './pages/HomeOverview';
import Store from './hooks/Store';
import {createTheme, ThemeProvider} from '@material-ui/core'
import Layout from './components/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from './../public/img/avatars/thomas.png'

const theme = createTheme({
  palette: {
      type: 'dark',
      primary: {
        main: '#ff5722',
      },
      secondary: {
        main: '#76ff03',
      },
  },
  typography: {
    fontFamily: 'Poppins'
  }
})

function App({hass, showMenu, narrow, panel}) {
    // /* eslint-disable no-unused-vars */
    // const {
    //   // Object containing all the state and methods to control Home Assistant
    //   hass,
    //   // Boolean if the sidebar is currently shown.
    //   showMenu,
    //   // Boolean if the UI should render in narrow mode.
    //   narrow,
    //   // Panel information that Home Assistant has (including config at panel.config)
    //   panel,
    // } = this.props;
    /* eslint-enable no-unused-vars */


    return (
      <Store hass={hass} className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter >
            <Layout>
            
              <Switch>
                <Redirect exact from='/home-dash' to='/home-dash/overview' />
                <Route path='/home-dash/overview' exact>
                  <HomeOverview/>
                </Route>
                <Route path='/home-dash/music' exact>
                  HAAAAJ
                </Route>
                <Route path='/home-dash/devices'> <img src={logo} alt="" /></Route>
                <Route path='/home-dash/demo'>
                  {console.log(hass)}
                <header className="App-header">
                    <h1 className="App-title">Welcome to the Djungle, {panel.config.name}</h1>
                  </header>
                  <ul className="App-intro">
                    {Object.keys(hass.states)
                      .filter(key => !hass.states[key].attributes.hidden)
                      .map(key =>
                        <EntityRow
                          key={key}
                          hass={hass}
                          stateObj={hass.states[key]}
                        />)}
                  </ul>
                </Route>
              </Switch>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </Store>
    );
}

export default App;
