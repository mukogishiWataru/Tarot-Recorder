import type { Component } from 'solid-js'
import { db, auth } from '~/firebase'

import { Router, Route } from '@solidjs/router'
import Home from '~/pages/Home'
import Input from '~/pages/Input'
import View from '~/pages/View'
import DefaultLayout from './layouts/DefaultLayout'

const App: Component = () => {
  return (
    <Router root={DefaultLayout}>
      <Route path="/input" component={Input} />
      <Route path="/" component={Home} />
      <Route path="/view" component={View} />
    </Router>
  )
}

export default App
