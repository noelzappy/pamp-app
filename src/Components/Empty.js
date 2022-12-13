import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Hooks'

const Empty = () => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()

  return (
    <View style={[Layout.fill, Layout.center, Gutters.largeTMargin]}>
      <Text style={[Fonts.textRegular, Fonts.textCenter, Common.text.bold]}>
        No data
      </Text>
    </View>
  )
}

export default Empty
