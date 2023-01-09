import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import FastImage from 'react-native-fast-image'
import { getVendorImage, getVendorLogo } from '@/Utils/misc'
import { height, width } from '@/Utils/dimensions'
import Spacer from './Spacer'
import { Avatar, Icon } from '@rneui/base'
import Pill from './Pills'

const VendorItem = ({ vendor, onPress }) => {
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()

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
      onPress={() => onPress(vendor)}
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
            source={getVendorImage(vendor)}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Avatar
          size="medium"
          source={getVendorLogo(vendor)}
          containerStyle={[
            {
              position: 'absolute',
              bottom: -8,
              left: 5,
              borderColor: Colors.white,
              borderWidth: 2,
            },
          ]}
          rounded
        />

        <View
          style={[
            Layout.row,
            Gutters.regularHPadding,
            Common.backgroundPrimary,
            Common.rounded,
            {
              position: 'absolute',
              bottom: -15,
              right: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.18,
              shadowRadius: 10.0,

              elevation: 24,
            },
            Gutters.smallVPadding,
          ]}
        >
          <Icon name="star" size={18} color={Colors.primary} type="antdesign" />
          <Text style={[Fonts.textSmall, Fonts.textLeft, Common.text.bold]}>
            {vendor.averageRating === 5
              ? '5.00'
              : 5 * Number(vendor.averageRating)}
          </Text>
        </View>
      </View>
      <Spacer size={25} />
      <Text style={[Fonts.textRegular, Fonts.textLeft, Common.text.bold]}>
        {vendor.name}
      </Text>
      <Spacer size={8} />
      <Pill
        pillItems={vendor.tags.map(item => ({
          title: item,
          onPress: () => {},
        }))}
        activeItem="all"
        disabled
      />
      <Spacer size={8} />
      <Text style={[Fonts.textSmall, Fonts.textLeft]}>{vendor.address}</Text>
    </TouchableOpacity>
  )
}

export default VendorItem
