import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import { Login } from '@/Containers'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.primary }]}>
      <NavigationContainer theme={NavigationTheme}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default AuthNavigator
