import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import Wrapper from '@/Components/Wrapper'

const Login = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Text>Helllo World</Text>
    </Wrapper>
  )
}

export default Login
