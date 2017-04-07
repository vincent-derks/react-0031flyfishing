import React, { Component } from 'react'
import _ from 'lodash'
import renderHTML from 'react-render-html';
import moment from 'moment'
import axios from 'axios'
import $ from 'jquery'

export default class Comments extends Component {

    constructor(props){
        super(props)
        this.state = {
            commentAdded: false
        }
    }

    submitComment(event){
        event.preventDefault()
        const name = this.refs.name.value,
              email = this.refs.email.value,
              message = this.refs.message.value

        const data = {
            action: 'handle_post_comment_form',
            data: {
                name, email, message,
                postId: this.props.post,
            }
        }

        const postComment = $.post(ajax_requests.ajax_url, data)
        postComment.always(response => {
            if(response){
                this.setState({
                    commentAdded: true
                }, ()=>{
                    this.props.reload()
                })
            }
        })
    }

    resetCommentForm(event){
        event.preventDefault()
        this.setState({
            commentAdded: false
        })
    }

    renderCommentForm(){
        if (!this.state.commentAdded){
            return(
                <form className="postComment" onSubmit={this.submitComment.bind(this)}>
                    <h4>Post a comment</h4>
                    <input type="text" placeholder="Your name" className="name" ref="name" required/>
                    <input type="email" placeholder="Your email" className="email" ref="email" />
                    <textarea placeholder="Your message" className="message" ref="message" rows="6" required/>
                    <input type="submit" value="Post comment" className="submit" />
                </form>
            )
        } else {
            return(
                <div>
                    <p>Comment added!</p>
                    <button className="addNewComment" onClick={this.resetCommentForm.bind(this)}>Add another comment</button>
                </div>
            )
        }
    }

    render(){
        return(
            <div className="comments">
                <h3>Comments</h3>
                {this.props.comments.length < 1 && <p>No comments yet, be the first to comment!</p>}
                <ul className="commentList">
                    {this.props.comments.map(comment=>{
                        return (
                            <li key={_.uniqueId()} className="comment">
                                <img src={comment.avatar} className="avatar" />
                                <h4 className="commentTitle">{comment.author}</h4>
                                <span className="postDate">{moment(comment.date).format('D-MM-YYYY')}</span>
                                <p>{renderHTML(comment.content)}</p>
                            </li>
                        )
                    })}

                </ul>
                {this.renderCommentForm()}
            </div>
        )
    }
}
