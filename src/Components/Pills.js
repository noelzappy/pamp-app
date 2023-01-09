import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Hooks'

const Pill = ({ pillItems, activeItem }) => {
  const { Common, Fonts, Colors } = useTheme()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {pillItems.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[Common.pill, activeItem === item.id && Common.pillActive]}
            onPress={item.onPress}
          >
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textCenter,
                {
                  color: activeItem === item.id ? Colors.light : Colors.text,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

Pill.propTypes = {
  pillItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      onPress: PropTypes.func,
      active: PropTypes.bool,
      id: PropTypes.string,
    }),
  ),
}

Pill.defaultProps = {
  pillItems: [],
}

export default Pill
