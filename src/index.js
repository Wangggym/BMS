import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
//文件引入
import HomePage from './pages/Home'
import UserAddPage from './pages/UserAdd'

ReactDOM.render((
  <Router history={hashHistory}>
      <Route path="/" component={HomePage} />
      <Route path="/user/add" component={UserAddPage} />
  </Router>
), document.getElementById('app'));