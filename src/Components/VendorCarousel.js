import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getImageUrl, getVendorLogo } from '@/Utils/misc'
import { height, width } from '@/Utils/dimensions'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { useTheme } from '@/Hooks'
import Spacer from './Spacer'
import { Avatar, Icon } from '@rneui/base'

const VendorCarousel = ({ vendor }) => {
  const carouselRef = useRef(null)
  const { Colors, Fonts, Layout, Common, Gutters } = useTheme()
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [images] = useState(vendor.gallery)

  const renderItem = ({ item, index }) => {
    return (
      <FastImage
        style={[
          {
            height: height(50),
            width: '100%',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          },
        ]}
        source={getImageUrl(item)}
        resizeMode={FastImage.resizeMode.cover}
        key={index}
      />
    )
  }
  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={width(100)}
        itemWidth={width(100)}
        onSnapToItem={index => setCarouselIndex(index)}
      />
      <Pagination
        activeDotIndex={carouselIndex}
        dotsLength={images.length}
        carouselRef={carouselRef.current}
        tappableDots={!!carouselRef.current}
        dotStyle={{
          padding: 6,
          borderRadius: 50,
          backgroundColor: Colors.light,
        }}
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          alignContent: 'center',
          alignSelf: 'center',
        }}
        inactiveDotStyle={{
          backgroundColor: Colors.light,
          opacity: 0.6,
        }}
        inactiveDotOpacity={0.6}
      />

      <View>
        <Avatar
          size="medium"
          source={getVendorLogo(vendor)}
          containerStyle={[
            {
              position: 'absolute',
              bottom: -18,
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
              bottom: -10,
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
    </View>
  )
}

VendorCarousel.propTypes = {
  vendor: PropTypes.object.isRequired,
}

VendorCarousel.defaultProps = {}

export default VendorCarousel
