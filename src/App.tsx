import type { Component } from 'solid-js'

import { Router, Route } from '@solidjs/router'
import Home from '~/pages/Home'
import Input from '~/pages/Input'
import View from '~/pages/View'
import DefaultLayout from './layouts/DefaultLayout'
import StatusProvider from './context/StatusProvider'

const App: Component = () => {
  return (
    <StatusProvider>
      <Router root={DefaultLayout}>
        <Route path="/input" component={Input} />
        <Route path="/" component={Home} />
        <Route path="/view" component={View} />
      </Router>
    </StatusProvider>
  )
}

export default App
