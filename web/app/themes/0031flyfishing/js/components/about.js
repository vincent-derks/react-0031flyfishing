import React, { Component } from 'react'
import axios from 'axios'
import * as Actions from './../actions'
import renderHTML from 'react-render-html'
import { connect } from 'react-redux'
import Loader from './loader'

@connect((state, ownProps)=>{
    return {
        page: state.contentReducer.content.singles.pages[ownProps.route.path.replace('/','')]
    }
})

export default class About extends Component {

    componentWillMount(){
        const slug = this.props.route.path.replace('/','')
        document.title = '0031flyfishing.com | About us'
        if(!this.props.page){
            let content = axios.get('/wp-json/wp/v2/pages?slug='+slug)
            content.then(response => {
                this.props.dispatch(Actions.getPost(response.data[0], 'pages', slug))
            })
        }
    }

    render(){
        if(this.props.page){
            return(
                <div className="single">
                    <div id="singleContent" className="singleContent">{renderHTML(this.props.page.content.rendered)}</div>
                </div>
            )
        } else {
            return <Loader/>
        }
    }
}
