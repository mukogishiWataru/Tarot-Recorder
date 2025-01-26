import type { Component } from 'solid-js'

import { Router, Route } from '@solidjs/router'
import Home from '~/pages/Home'
import Input from '~/pages/Input'
import View from '~/pages/View'
import DefaultLayout from './layouts/DefaultLayout'
import LoadingProvider from './context/LoadingProvider'

const App: Component = () => {
  return (
    <LoadingProvider>
      <Router root={DefaultLayout}>
        <Route path="/input" component={Input} />
        <Route path="/" component={Home} />
        <Route path="/view" component={View} />
      </Router>
    </LoadingProvider>
  )
}

export default App
