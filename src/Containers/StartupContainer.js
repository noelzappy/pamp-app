import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout, Gutters, Colors } = useTheme()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 1000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <ActivityIndicator
        size={'large'}
        style={[Gutters.largeVMargin]}
        color={Colors.primary}
      />
    </View>
  )
}

export default StartupContainer
