import React from '../../node_modules/react';
import Comment from './comment.jsx';


export default  class CommentList extends React.Component {

    handleLikeToggle(newCommentLikeStatus) {
        this.props.onLikeToggle(newCommentLikeStatus)
    }

    render() {
        var commentNodes = _.map(this.props.data, function (comment) {
            return (

                <Comment author={comment.author} key={comment.id} id={comment.id} isLiked={comment.isLiked}
                         onLikeToggle={this.handleLikeToggle.bind(this)}>
                    {comment.text}
                </Comment>
            )
        }.bind(this));
        return (
            <div className="commentList">
                <ul>
                    {commentNodes}

                </ul>
            </div>
        )
    }
}
