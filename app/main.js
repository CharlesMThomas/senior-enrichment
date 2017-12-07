'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store'

import AllCampuses from './components/AllCampuses';
import AllStudents from './components/AllStudents';
import SingleCampus from './components/SingleCampus';
import SingleStudent from './components/SingleStudent';

render (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/students/:id" component={SingleStudent} />
        <Route path="/students" component={AllStudents} />
        <Route path="/campuses/:id" component={SingleCampus} />
        <Route component={AllCampuses} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('main')
)
