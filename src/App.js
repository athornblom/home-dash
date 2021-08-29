import React, { Component, useCallback } from 'react';
import './components/Panel.css';
import EntityRow from './components/EntityRow.js';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import HomeOverview from './pages/HomeOverview';
import Store from './hooks/Store';
import { createTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios'
import { useEffect } from 'react';

const theme = (darkMode) => createTheme({
  palette: {
    type: darkMode ? 'dark' : 'light',
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



function App({ hass, showMenu, narrow, panel }) {
  // const authHassio = axios.create({
  //   baseURL: '/api/',
  //   headers: {
  //     Authorization: `Bearer ${panel.config.apiKey}`
  //   }
  // })
  // const fetchData = useCallback(async () => {
  //   try {
  //     const result = await authHassio.get(`/history/period`,{ filter_entity_id : 'sensor.hallen_rorelsedeckare_temperature'})
  //     console.log(result.data)
  //   } catch (err) {
  //     //set request error message
  //     console.log(err.message)
  //   }
  // })

  // useEffect(() => {
  //   fetchData();
  // }, []);
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
    <Store hass={hass} panel={panel} className="App">
      <ThemeProvider theme={theme(hass.themes.darkMode)}>
        <CssBaseline />
        <BrowserRouter >
          <Layout>
            <Switch>
              <Redirect exact from='/home-dash' to='/home-dash/overview' />
              <Route path='/home-dash/overview' exact>
                <HomeOverview />
              </Route>
              <Route path='/home-dash/music' exact>
                <img src={hass.states["media_player.tv"].attributes.entity_picture_local} alt="" />
                {hass.states["media_player.tv"].attributes.entity_picture_local}
              </Route>
              <Route path='/home-dash/devices'>
                {"K\u00f6ket"}
              </Route>
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
