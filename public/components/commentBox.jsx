import React from '../../node_modules/react';
import CommentList from './commentList.jsx';
import CommentForm from './commentForm.jsx';
const $ = require('jquery');
const _ = require('lodash');
import url from 'url';

export default class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,
            success: function (data) {
                console.log('got data from server', data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('failed to fetch', this.props.url, JSON.stringify(err))
            }.bind(this)
        })
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval)
    }


    handleCommentSubmit(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var tempNewComments = comments.concat([comment]);
        this.setState({data: tempNewComments});
        $.ajax({
            url: this.props.url,
            dataType: "json",
            type: "POST",
            data: comment,
            success: function (data) {
                console.log('got data from server after post', data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('failed to post', this.props.url, JSON.stringify(err));
                this.setState({data: comments});
            }.bind(this)
        })
    }

    handleLikeToggle(newCommentLikeStatus){
        var comments = this.state.data;
        var tempNewComments = _.clone(comments);
        let comment = _.find(tempNewComments, x => x.id == newCommentLikeStatus.commentId);
        comment.isLiked = newCommentLikeStatus.isLiked;

        this.setState({data: tempNewComments});
        var key = newCommentLikeStatus.commentId;
        let toggleType = newCommentLikeStatus.isLiked ? "POST" : "DELETE";
        var resolvedUrl = url.resolve(this.props.url, `comments/${key}/like`);
        $.ajax({
            url: resolvedUrl,
            dataType:"json",
            type:toggleType,
            success: function (data) {
                console.log('got data from server after post like', data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('failed to post like', resolvedUrl, JSON.stringify(err));
                this.setState({data: comments});
            }.bind(this)
        })
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} onLikeToggle={this.handleLikeToggle.bind(this)}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
            </div>
        );
    }
}
