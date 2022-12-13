import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UHeader } from '@/Components'
import { Input, Icon } from '@rneui/base'
import Pill from '@/Components/Pills'

const pillItems = [
  {
    title: 'All',
    onPress: () => {},
    active: true,
    id: 'all',
  },
  {
    title: 'Most Popular',
    onPress: () => {},
    active: false,
    id: 'popular',
  },
  {
    title: 'New',
    onPress: () => {},
    active: false,
    id: 'new',
  },

  {
    title: 'Most Popular',
    onPress: () => {},
    active: false,
    id: 'popular',
  },
  {
    title: 'New',
    onPress: () => {},
    active: false,
    id: 'new',
  },
]

const Container = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[Gutters.smallHPadding]}
      >
        <UHeader />
        <Input
          placeholder="Search for a service"
          inputContainerStyle={[Common.textInput]}
          leftIcon={
            <Icon name="search" type="feather" color={Colors.textLight} />
          }
        />
        <Pill pillItems={pillItems} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
