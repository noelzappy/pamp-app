import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Header, Icon } from '@rneui/base'
import { useTheme } from '@/Hooks'
import { goBack } from '@/Navigators/utils'

const BHeader = ({ title, subtitle, back }) => {
  const { Fonts, Colors, Common } = useTheme()

  return (
    <Header
      containerStyle={[
        {
          backgroundColor: Colors.light,
        },
      ]}
    >
      {back ? (
        <Icon
          name="chevron-back"
          size={30}
          type="ionicon"
          onPress={() => {
            goBack()
          }}
        />
      ) : null}
      <View>
        <Text
          style={[
            Fonts.textCenter,
            Fonts.textRegular,
            Common.text.bold,
            Common.text.primary,
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={[Fonts.textCenter, Common.text.primary]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Header>
  )
}

BHeader.propTypes = {
  back: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

BHeader.defaultProps = {
  subtitle: '',
  back: true,
}

export default BHeader
