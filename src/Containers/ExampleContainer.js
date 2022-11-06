import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import Wrapper from '@/Components/Wrapper'

const ExampleContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[
          Layout.fill,
          Layout.colCenter,
          Gutters.smallHPadding,
        ]}
      >
        <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>
          DarkMode :
        </Text>
      </ScrollView>
    </Wrapper>
  )
}

export default ExampleContainer
