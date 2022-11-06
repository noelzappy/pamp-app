import React from 'react'
import { useSelector } from 'react-redux'
import ApplicationNavigator from './Application'
import AuthNavigator from './AuthNavigator'

const RootNavigator = () => {
  const { user, tokens } = useSelector(state => state.auth)
  if (user && tokens) {
    return <ApplicationNavigator />
  }

  return <AuthNavigator />
}

export default RootNavigator
