import React from '../../node_modules/react';
const likeStyle = require('../scss/like.scss');

export default class LikeButton extends React.Component {

    handleClick(event){
        event.preventDefault();
        let isLiked = !this.props.isLiked;
        this.props.onLikeToggle({isLiked:isLiked});
    }
    render() {
        let heartClass = this.props.isLiked ? 'fa fa-heart like' : 'fa fa-heart-o like';
        return (

            <i className={heartClass} aria-hidden="true" onClick={this.handleClick.bind(this)}></i>

        )
    }
}

