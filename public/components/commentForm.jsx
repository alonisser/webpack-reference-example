import React from '../../node_modules/react';


export default class CommentForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {author: '', text: ''};
    }

    handleAuthorChange(event) {
        this.setState({author: event.target.value})
    }

    handleTextChange(event) {
        this.setState({text: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            console.error('Missing author or text');
            return;
        }
        console.log('Handling submit');
//No request actually sent..
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''})
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="You name please" value={this.state.author}
                       onChange={this.handleAuthorChange.bind(this)}/>
                <input type="text" placeholder="Say something.." value={this.state.text}
                       onChange={this.handleTextChange.bind(this)}/>
                <input type="submit" value="Post"/>
            </form>
        )
    }

}
