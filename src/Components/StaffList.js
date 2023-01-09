import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import { Avatar } from '@rneui/base'
import { getImageUrl } from '@/Utils/misc'
import { useTheme } from '@/Hooks'

const StaffList = ({ staffs, onPress, selectedId }) => {
  const { Layout, Colors, Common, Fonts, Gutters } = useTheme()

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[Layout.center, Gutters.smallHMargin]}
        onPress={() => onPress(item)}
      >
        <Avatar
          source={getImageUrl(item.user.image)}
          size="large"
          rounded
          containerStyle={[
            selectedId === item.id
              ? {
                  borderWidth: 5,
                  borderColor: Colors.primary,
                }
              : {},
          ]}
        />
        <Text style={[Fonts.textRegular, Common.text.bold]}>
          {item.user.firstName}
        </Text>
      </TouchableOpacity>
    )
  }

  return <FlatList data={staffs} renderItem={renderItem} horizontal />
}

StaffList.propTypes = {
  onPress: PropTypes.func,
  staffs: PropTypes.array.isRequired,
}

StaffList.defaultProps = {
  onPress: () => {},
}

export default StaffList
