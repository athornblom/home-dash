import React, { Component } from 'react';
import './components/Panel.css';
import EntityRow from './components/EntityRow.js';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import HomeOverview from './views/HomeOverview';
import Store from './hooks/Store';
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
         <BrowserRouter >
        <Switch>
          <Route path='/home-dash' exact>
          
          <HomeOverview></HomeOverview>
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
        </BrowserRouter>
      
      </Store>
    );
}

export default App;
