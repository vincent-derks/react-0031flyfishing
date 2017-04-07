import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import * as Actions from './../actions'
import { connect } from 'react-redux'

@connect((state, ownProps)=>{
    return {
        menu: state.appReducer.menus.mainMenu,
        globals: state.appReducer.globals
    }
})

export default class MainNav extends Component {
    constructor(props){
        super(props)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
    }

    toggleMenu(e){
        e.preventDefault()
        this.refs.toggleMenu.classList.toggle('open')
        this.refs.mainNavUl.classList.toggle('open')
        if(this.refs.toggleMenu.classList.value.indexOf('open') > 0){
            this.refs.toggleMenu.setAttribute('aria-expanded', true)
        } else {
            this.refs.toggleMenu.setAttribute('aria-expanded', false)
        }
    }

    closeMenu(){
        this.refs.toggleMenu.classList.remove('open')
        this.refs.mainNavUl.classList.remove('open')
        this.refs.toggleMenu.setAttribute('aria-expanded', false)
    }

    componentWillMount(){
        if(!this.props.menu){
            let content = axios.get('/wp-json/0031flyfishing/v1/menus/main-menu-v5')
            content.then(response => {
                this.props.dispatch(Actions.getMenus(response.data, 'mainMenu'))
            })
        }
    }

    render(){
        if(!this.props.menu){
            return <div>Loading menu</div>
        }
        return(
            <nav className="main-nav">
                <a href="#" className="toggle-menu" aria-expanded="false" ref="toggleMenu" onClick={this.toggleMenu}><i className="bar"></i></a>
                <ul ref="mainNavUl">
                    {this.props.menu.map( (item, index)=>{
                        const url = item.url.replace(this.props.globals.home, '')
                        return <li key={item.ID}><Link onClick={this.closeMenu} style={{animationDelay: index * 0.05 + 0.2 + 's'}} to={url}><i className={`fa ${item.classes[0]}`} aria-hidden="true"></i> {item.title}</Link></li>
                    })}
                </ul>
            </nav>
        )
    }
}
