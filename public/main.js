/**
 * Created by alonisser on 15/05/16.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import CommentBox from './components/commentBox.jsx';
const style = require('./css/base.css');
const apiUrl = "http://"+ process.env.API_ADDRESS +"/api/comments";

ReactDOM.render(
  <CommentBox url={apiUrl} pollInterval={2000}/>,
  document.getElementById('content')
);
