import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BHeader } from '@/Components'

const Container = ({ route }) => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <BHeader title="Select Date & Time" />

      <ScrollView style={Layout.fill}>
        <Text>Hello World</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
