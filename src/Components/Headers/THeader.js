import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Header, Icon } from '@rneui/base'
import { useTheme } from '@/Hooks'
import { goBack } from '@/Navigators/utils'
import { width } from '@/Utils/dimensions'

const THeader = ({ title }) => {
  const { Fonts, Gutters, Colors, Common, Layout } = useTheme()

  return (
    <Header
      containerStyle={[
        {
          backgroundColor: Colors.light,
        },
      ]}
    >
      <Text
        style={[
          Fonts.textLeft,
          Fonts.textLarge,
          Common.text.bold,
          Common.text.primary,
          {
            width: width(90),
          },
        ]}
      >
        {title}
      </Text>
    </Header>
  )
}

THeader.propTypes = {
  back: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

THeader.defaultProps = {
  subtitle: '',
  back: true,
}

export default THeader
