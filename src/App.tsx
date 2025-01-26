import type { Component } from 'solid-js'

import { Router, Route } from '@solidjs/router'
import Home from '~/pages/Home'
import Input from '~/pages/Input'
import View from '~/pages/View'
import DefaultLayout from './layouts/DefaultLayout'
import LoadingProvider from './context/LoadingProvider'
import SuccessProvider from './context/SuccessProvider'

const App: Component = () => {
  return (
    <LoadingProvider>
      <SuccessProvider>
        <Router root={DefaultLayout}>
          <Route path="/input" component={Input} />
          <Route path="/" component={Home} />
          <Route path="/view" component={View} />
        </Router>
      </SuccessProvider>
    </LoadingProvider>
  )
}

export default App
