import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { clearCredentials } from '@/Store/Auth'
import { THeader } from '@/Components'
import { Avatar } from '@rneui/base'

const Container = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[Layout.fill, Gutters.smallHPadding]}
      >
        <THeader title="Settings" />
        <View style={[Layout.center]}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: user.image || 'https://picsum.photos/200/300',
            }}
            title={user.firstName[0]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
