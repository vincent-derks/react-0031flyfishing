import React, { Component } from 'react'
import axios from 'axios'
import * as Actions from './../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MainNav from './mainnav'

@connect((state, ownProps) =>{
    return {
        globals: state.appReducer.globals
    }
})

export default class App extends Component {
    componentWillMount(){
        let globals = axios.get('/wp-json')
        globals.then(response => {
            this.props.dispatch(Actions.setGlobals(response.data))
        })
    }
    render(){
        if(this.props.globals){
            return(
                <div>
                    <header>
                        <Link to='/'><img className="logo" src={'/app/themes/0031flyfishing/images/logo.svg'} alt="logo" /></Link>
                        <MainNav />
                    </header>
                    <div className="pageContent">
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading</div>
            )
        }
    }
}
