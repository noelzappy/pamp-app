import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { Avatar, Header, Icon } from '@rneui/base'
import { useTheme } from '@/Hooks'
import { width } from '@/Utils/dimensions'
import { View } from 'react-native-animatable'
import { useSelector } from 'react-redux'
import { getAvatar } from '@/Utils/misc'

const UHeader = ({ title }) => {
  const { Fonts, Colors, Common, Layout, Gutters } = useTheme()
  const { user } = useSelector(state => state.auth)

  return (
    <Header
      containerStyle={[
        {
          backgroundColor: Colors.mediumLight,
        },
      ]}
    >
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          {
            width: width(90),
          },
          Layout.fill,
        ]}
      >
        <View style={[Layout.row, Layout.alignItemsCenter, Layout.fill]}>
          <Avatar rounded size="medium" source={getAvatar(user)} />
          <View style={[Gutters.smallLMargin]}>
            <Text
              style={[
                Fonts.textRegular,
                Fonts.textLeft,
                Fonts.textRegular,
                Common.text.bold,
                Common.text.primary,
              ]}
            >
              Hi, {user?.firstName}
            </Text>
          </View>
        </View>

        <View>
          <Icon name="bell" type="feather" color={Colors.primary} />
        </View>
      </View>
    </Header>
  )
}

UHeader.propTypes = {
  back: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}

UHeader.defaultProps = {
  subtitle: '',
  back: true,
}

export default UHeader
