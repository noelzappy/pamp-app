import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { VerifyHome, VerifyConfirmation } from '@/Containers'

const Stack = createStackNavigator()

const VerificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VerifyHome" component={VerifyHome} />
      <Stack.Screen name="VerifyConfirmation" component={VerifyConfirmation} />
    </Stack.Navigator>
  )
}

export default VerificationStack
