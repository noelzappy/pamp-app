import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Header, Icon } from '@rneui/base'
import { useTheme } from '@/Hooks'
import { goBack } from '@/Navigators/utils'

const CHeader = ({ title, subtitle, back }) => {
  const { Fonts, Colors, Common } = useTheme()

  return (
    <Header
      containerStyle={[
        {
          backgroundColor: Colors.mediumLight,
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
            Common.text.accent,
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={[Fonts.textCenter, Common.text.accent]}>{subtitle}</Text>
        ) : null}
      </View>
    </Header>
  )
}

CHeader.propTypes = {
  back: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

CHeader.defaultProps = {
  subtitle: '',
  back: true,
}

export default CHeader
