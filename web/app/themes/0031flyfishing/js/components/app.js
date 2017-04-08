import React, { Component } from 'react'
import axios from 'axios'
import * as Actions from './../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

import MainNav from './mainnav'

@connect((state, ownProps) =>{
    return {
        globals: state.appReducer.globals,
        showBackButton: state.appReducer.showBackButton
    }
})

export default class App extends Component {
    componentWillMount(){
        let globals = axios.get('/wp-json')
        globals.then(response => {
            this.props.dispatch(Actions.setGlobals(response.data))
        })
    }
    componentWillUpdate(){
        console.log('will update')
    }
    render(){
        if(this.props.globals){
            return(
                <div>
                    <header>
                        <button className={this.props.showBackButton ? 'showBackButton backButton' : 'hideBackButton backButton'} onClick={browserHistory.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
                        <Link className={this.props.showBackButton ? 'logo withBackButton' : 'logo'} to='/'><img src={'/app/themes/0031flyfishing/images/logo.svg'} alt="logo" /></Link>
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
