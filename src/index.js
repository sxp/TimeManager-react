import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation'
import CreateAccount from './CreateAccount'
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Router, Route, browserHistory} from 'react-router'
injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Navigation}/>
            <Route path="/auth/qq/create" component={CreateAccount}/>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);
