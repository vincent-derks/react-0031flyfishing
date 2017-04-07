import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import * as Actions from './../actions'
import Lightbox from 'react-images'
import $ from 'jquery'
import renderHTML from 'react-render-html'
import Loader from './loader'

import RelatedPosts from './relatedposts'
import Comments from './comments'
import months from './../data/months'

@connect((state, ownProps)=>{
    return {
        cat: state.contentReducer.content.singles[ownProps.params.cat],
        globals: state.appReducer.globals
    }
})

export default class Single extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentImage: 0,
            lightboxOpen: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            setTimeout(()=>{
                const content = document.getElementById('singleContent')
                const images = content.getElementsByTagName('img')
                $.makeArray(images).forEach((image, index) => {
                    $(image).attr('index', index)
                    image.addEventListener('click', e => {
                        e.preventDefault()
                        this.setState({
                            currentImage: + $(e.target).attr('index'),
                            lightboxOpen: true
                        })
                    })
                })
            }, 1500)
            if (!nextProps.cat) {
                this.loadContent(nextProps)
            } else {
                if(!nextProps.cat[nextProps.params.postSlug]){
                    this.loadContent(nextProps)
                }
            }
        }
    }

    componentWillMount(){
        setTimeout(()=>{
            const content = document.getElementById('singleContent')
            const images = content.getElementsByTagName('img')
            $.makeArray(images).forEach((image, index) => {
                $(image).attr('index', index)
                image.addEventListener('click', e => {
                    e.preventDefault()
                    this.setState({
                        currentImage: + $(e.target).attr('index'),
                        lightboxOpen: true
                    })
                })
            })
        }, 1500)
        if (!this.props.cat) {
            this.loadContent(this.props)
        } else {
            if(!this.props.cat[this.props.params.postSlug]){
                this.loadContent(this.props)
            }
        }
    }

    loadContent(props){
        if(!props){ props = this.props }
        let content = axios.get('/wp-json/wp/v2/posts?slug='+props.params.postSlug+'&_embed')
        content.then(response => {
            props.dispatch(Actions.getPost(response.data[0], props.params.cat, props.params.postSlug))
        })
    }

    gotoPrevious(){
        this.setState({ currentImage: this.state.currentImage - 1 })
    }
    gotoNext(){
        this.setState({ currentImage: this.state.currentImage + 1 })
    }
    closeLightbox(){
        this.setState({ lightboxOpen: false })
    }

    render(){
        if (!this.props.cat){
            return <Loader/>
        } else {
            if(!this.props.cat[this.props.params.postSlug]){
                return <Loader/>
            } else {
                const post = this.props.cat[this.props.params.postSlug]
                const thumb = () => post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '/'+post.thumbnail.old.replace('wp-content','app')
                const dateRaw = new Date(post.date)
                const postDate = `${dateRaw.getDate()} ${months[dateRaw.getMonth()]} ${dateRaw.getFullYear()}`
                const images = $.makeArray($(post.content.rendered).find('img')).map(image => {
                    if(image.parentElement.nodeName == 'A'){
                        return {
                            src: image.parentElement.getAttribute('href')
                        }
                    }
                    return {
                        src: image.getAttribute('src')
                    }
                })
                document.title = '0031flyfishing.com | '+ post.title.rendered
                const gridSupport = ('gridRow' in document.body.style) ? true : false
                return(
                    <div className={gridSupport ? "single grid-support" : "single no-grid-support"}>
                        <section className="main">
                            <h1>{renderHTML(post.title.rendered)}</h1>
                            <div id="singleContent" className="singleContent">{renderHTML(post.content.rendered)}</div>
                        </section>
                        <aside className="right">
                            <div className="postInfo">
                                <Lightbox
                                    ref="lightbox"
                                    images={images}
                                    isOpen={this.state.lightboxOpen}
                                    onClickPrev={this.gotoPrevious.bind(this)}
                                    onClickNext={this.gotoNext.bind(this)}
                                    onClose={this.closeLightbox.bind(this)}
                                    currentImage={this.state.currentImage}
                                />
                                <img className="singleThumb" src={thumb()} alt={renderHTML(post.title.rendered)+ ' thumbnail'}/>
                                <span><em>Written by {post._embedded.author[0].name}</em></span>
                                <span><em>Posted on {postDate}</em></span>
                            </div>
                        </aside>
                        <aside className="left">
                            <Comments post={post.id} comments={post.comments} reload={this.loadContent.bind(this)}/>
                            <RelatedPosts tags={post.tags} currentPost={post.id} />
                        </aside>
                    </div>
                )
            }
        }
    }

}
