import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import { connect } from 'react-redux'

@connect((state, ownProps)=>{
    return {
        content: state.contentReducer.content[ownProps.page],
        globals: state.appReducer.globals,
        pages: state.appReducer.pages
    }
})

export default class PostList extends Component {
    render(){
        const loadMorePostsStyles = () => this.props.paged >= this.props.pages[this.props.page] ? { visibility: 'hidden' } : {  }
        return(
            <div className="posts">
                {this.props.content.map( (page, i) => {
                    return(
                        <div className="page" id={'page-'+(i+1)} key={'page-'+(i+1)}>
                            {page.map((post, j) => {
                                const getTitle = () => { return { __html: post.title.rendered } }
                                const getExcerpt = () => { return { __html: post.excerpt.rendered } }
                                const getLink = () => post.link.replace(this.props.globals.home, '')
                                const thumb = () => post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '/'+post.thumbnail.old.replace('wp-content','app')
                                const commentCount = post.commentCount
                                const postStyles = { animationDelay: j / 15 + 's' }
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
                })}
                <button style={loadMorePostsStyles()} className="loadMorePosts" onClick={this.props.loadMorePosts}>Load more posts</button>
            </div>
        )
    }
}
