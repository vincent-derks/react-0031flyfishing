import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { connect } from 'react-redux'

@connect((state, ownProps) => {
    return {
        globals: state.appReducer.globals
    }
})

export default class RelatedPosts extends Component {

    constructor(props){
        super(props)
        this.state = {
            relatedPosts: []
        }
    }

    componentWillMount(){
        if(this.props.tags.length > 0){
            let content = axios.get(`/wp-json/wp/v2/posts?tags=${this.props.tags.join(',')}&_embed&per_page=16`)
            content.then(response => {
                this.setState({
                    relatedPosts: response.data
                })
            })
        }
    }

    render(){
        if(this.props.tags.length <= 0) return null
        return(
            <div className="relatedPosts">
                <h3>Some posts that might interest you</h3>
                {this.state.relatedPosts
                    .filter(post => this.props.currentPost !== post.id)
                    .map( (post, i) => {
                    const getTitle = () => { return { __html: post.title.rendered } }
                    const getExcerpt = () => { return { __html: post.excerpt.rendered } }
                    const getLink = () => post.link.replace(this.props.globals.home, '')
                    const thumb = () => post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '/'+post.thumbnail.old.replace('wp-content','app')
                    const commentCount = post.commentCount
                    const postStyles = { animationDelay: i / 15 + 's' }
                    const bgStyles = { backgroundImage: 'url('+thumb()+')' }
                    return (
                        <Link to={getLink()} className="post" key={post.id} style={postStyles}>
                            {thumb() && <div className="postBackground" style={bgStyles}/>}
                            <div className="postContent">
                                <h2 dangerouslySetInnerHTML={getTitle()}/>
                                <article className="excerpt" dangerouslySetInnerHTML={getExcerpt()}/>
                                <span className="commentCount"><i className="fa fa-comments" aria-hidden="true"></i> {commentCount}</span>
                                <span className="read-more">Read more <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }

}
