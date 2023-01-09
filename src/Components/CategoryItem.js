import React from 'react'

import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import FastImage from 'react-native-fast-image'
import { getImageUrl } from '@/Utils/misc'
import { height, width } from '@/Utils/dimensions'
import Spacer from './Spacer'

const CategoryItem = ({ item, onPress }) => {
  const { Layout, Common, Gutters, Fonts } = useTheme()

  return (
    <TouchableOpacity
      style={[
        Layout.fill,
        Common.backgroundLight,
        { borderRadius: 10 },
        Gutters.regularBPadding,
        Gutters.smallPadding,
        Gutters.largeBMargin,
      ]}
      onPress={() => onPress(item)}
    >
      <View style={[Layout.fill]}>
        <View>
          <FastImage
            style={[
              {
                height: height(30),
                width: '100%',
                borderRadius: 10,
              },
            ]}
            source={getImageUrl(item.image)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>
      <Spacer size={25} />
      <Text style={[Fonts.textRegular, Fonts.textLeft, Common.text.bold]}>
        {item.name}
      </Text>
      <Spacer size={8} />

      <Spacer size={8} />
      <Text style={[Fonts.textSmall, Fonts.textLeft]}>{item.address}</Text>
    </TouchableOpacity>
  )
}

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

CategoryItem.defaultProps = {}

export default CategoryItem
