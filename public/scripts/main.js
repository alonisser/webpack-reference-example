/**
 * Created by alonisser on 15/05/16.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import CommentBox from '../components/commentBox.jsx';


ReactDOM.render(
  <CommentBox url="http://localhost:3000/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
);
