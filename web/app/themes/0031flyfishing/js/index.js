import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Main reducer
import rootReducer from './reducers'

// Components
import App from './components/app'
import Home from './components/home'
import Articles from './components/articles'
import Videos from './components/videos'
import Flytying from './components/flytying'
import About from './components/about'
import Spots from './components/spots'
import Single from './components/single'
import NoMatch from './components/no-match'

// Create the main store
let store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension())

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}></IndexRoute>
                <Route path="/flyfishing-articles" component={Articles}></Route>
                <Route path="/videos" component={Videos}></Route>
                <Route path="/flytying" component={Flytying}></Route>
                <Route path="/about-us" component={About}></Route>
                <Route path="/spots" component={Spots}></Route>
                <Route path="/:cat/:tag/:postSlug" component={Single}></Route>
                <Route path="/:cat/:postSlug" component={Single}></Route>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
