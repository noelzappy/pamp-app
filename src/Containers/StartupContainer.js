import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useLazyGetMeQuery } from '@/Services/modules/user'
import { displayError } from '@/Utils/errors'
import { useDispatch } from 'react-redux'
import { clearCredentials } from '@/Store/Auth'

const StartupContainer = () => {
  const { Layout, Gutters, Colors } = useTheme()
  const [getMe, { error }] = useLazyGetMeQuery()
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const init = async () => {
    const { data: me } = await getMe()
    await setDefaultTheme({ theme: 'default', darkMode: null })
    if (me && me.isVerified) {
      navigateAndSimpleReset('Main')
      return
    }
    navigateAndSimpleReset('Verification')
  }

  useEffect(() => {
    if (error) {
      displayError(error)
      dispatch(clearCredentials())
    }
  }, [error, dispatch])

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
