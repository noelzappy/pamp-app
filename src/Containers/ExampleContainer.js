import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'

const Container = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[
          Layout.fill,
          Layout.colCenter,
          Gutters.smallHPadding,
        ]}
      >
        <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>
          HELLO WORLD
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
