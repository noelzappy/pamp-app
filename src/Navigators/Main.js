import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useTheme } from '@/Hooks'
import { Icon } from '@rneui/base'
import { height } from '@/Utils/dimensions'
import { Home, Bookings, Favorites, Settings } from '@/Containers'

const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }) {
  const { Common, Colors, Gutters, Layout, Fonts } = useTheme()

  return (
    <View
      style={[
        Layout.row,
        Common.backgroundPrimary,
        {
          height: height(5),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const iconName = () => {
          switch (index) {
            case 0:
              return { name: 'home', type: 'antdesign' }
            case 1:
              return { name: 'calendar', type: 'antdesign' }
            case 2:
              return { name: 'hearto', type: 'antdesign' }
            case 3:
              return { name: 'sound-mix', type: 'entypo' }

            default:
              return { name: 'home', type: 'feather' }
          }
        }

        return (
          <Animatable.View
            style={[
              Layout.fill,
              isFocused
                ? {
                    backgroundColor: Colors.primary,
                    borderRadius: 20,
                  }
                : {},
              Gutters.smallHPadding,
            ]}
            key={index}
            animation={isFocused ? 'zoomIn' : undefined}
            duration={200}
          >
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                Layout.fill,
                Layout.row,
                Layout.justifyContentCenter,
                Layout.alignItemsCenter,
              ]}
              activeOpacity={0.8}
              disabled={isFocused}
            >
              <Icon
                {...iconName()}
                size={isFocused ? 20 : 25}
                color={isFocused ? Colors.light : Colors.primary}
              />

              {isFocused && (
                <Text
                  style={[
                    Fonts.textCenter,
                    Common.text.base,
                    {
                      color: Colors.light,
                      marginLeft: 5,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          </Animatable.View>
        )
      })}
    </View>
  )
}

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookings" component={Bookings} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default MainNavigator
