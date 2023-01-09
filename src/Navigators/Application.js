import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'
import VerificationStack from './VerificationStack'
import {
  StartupContainer,
  Profile,
  Vendors,
  SingleVendor,
  BookingDate,
} from '@/Containers'

const Stack = createStackNavigator()

const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.primary }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen name="Verification" component={VerificationStack} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />

          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Vendors" component={Vendors} />
          <Stack.Screen name="SingleVendor" component={SingleVendor} />
          <Stack.Screen name="BookingDate" component={BookingDate} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
