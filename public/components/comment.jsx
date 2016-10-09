import React from '../../node_modules/react';
import LikeButton from './like.jsx';

export default class Comment extends React.Component {

    getRawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }

    handleLikeToggle(likeStatus) {
        var newCommentLikeStatus = {
            isLiked:likeStatus.isLiked,
            commentId: this.props.id
        };

        this.props.onLikeToggle(newCommentLikeStatus)

    }


    render() {
        console.log('we got here!', this.props.author);
        return (
            <li>
                <div className="comment">

                    <h2 className="commentAuthor">
                        {this.props.author}
                    </h2>
                    <span dangerouslySetInnerHTML={this.getRawMarkup()}></span>
                    <LikeButton isLiked={this.props.isLiked} onLikeToggle={this.handleLikeToggle.bind(this)}/>
                </div>
            </li>

        )
    }

}
