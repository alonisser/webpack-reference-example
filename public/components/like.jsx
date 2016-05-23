import React from '../../node_modules/react';

export default class LikeButton extends React.Component {
    
    handleClick(event){
        event.preventDefault();
        let isLiked = !this.props.isLiked;
        this.props.onLikeToggle({isLiked:isLiked});
        console.log('click')
    }
    render() {
        let heartClass = this.props.isLiked ? 'fa fa-heart' : 'fa fa-heart-o';
        return (

            <i className={heartClass} aria-hidden="true" onClick={this.handleClick.bind(this)}></i>

        )
    }
}

