import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CHeader, Spacer } from '@/Components'
import { useTheme } from '@/Hooks'
import { Button, Input, Icon } from '@rneui/base'
import { Formik } from 'formik'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = ({ navigation }) => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = values => {}

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <CHeader
        title="Create New Account"
        subtitle="Please fill the form to continue"
      />
      <ScrollView contentContainerStyle={[Gutters.smallHPadding]}>
        <Spacer size={40} />
        <Formik
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
          }}
          onSubmit={values => onSubmit(values)}
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Email is required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            if (!values.password) {
              errors.password = 'Password is required'
            }

            if (!values.firstName) {
              errors.firstName = 'First name is required'
            }

            if (!values.lastName) {
              errors.lastName = 'Last name is required'
            }

            if (!values.phoneNumber) {
              errors.phoneNumber = 'Phone number is required'
            } else if (!/^[0-9]{10}$/i.test(values.phoneNumber)) {
              errors.phoneNumber = 'Invalid phone number'
            }

            return errors
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View>
              <Input
                placeholder="First Name"
                inputContainerStyle={[Common.textInput]}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                errorMessage={touched.firstName && errors.firstName}
              />

              <Input
                placeholder="Last Name"
                inputContainerStyle={[Common.textInput]}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                errorMessage={touched.lastName && errors.lastName}
              />

              <Input
                placeholder="Phone Number"
                inputContainerStyle={[Common.textInput]}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                errorMessage={touched.phoneNumber && errors.phoneNumber}
                keyboardType="phone-pad"
              />

              <Input
                placeholder="try@pamp.com"
                inputContainerStyle={[Common.textInput]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={touched.email && errors.email}
                keyboardType="email-address"
              />

              <Spacer size={20} />

              <Input
                placeholder="Password"
                inputContainerStyle={[Common.textInput]}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={touched.password && errors.password}
                secureTextEntry={!showPassword}
                rightIcon={
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    type="ionicon"
                    onPress={() => setShowPassword(!showPassword)}
                    color={Colors.textLight}
                  />
                }
              />
              <Spacer size={20} />

              <View style={[Gutters.regularHPadding]}>
                <Text
                  style={[
                    Fonts.textRight,
                    {
                      color: Colors.textLight,
                    },
                  ]}
                >
                  Forgot Password
                </Text>
              </View>
              <Spacer size={20} />

              <Button
                title="Sign Up"
                onPress={handleSubmit}
                buttonStyle={[Common.button.large]}
              />
            </View>
          )}
        </Formik>
        <Spacer size={20} />
        <Text
          style={[Fonts.textCenter]}
          onPress={() => navigation.navigate('Login')}
        >
          Have an account?
          <Text
            style={[
              Fonts.textCenter,
              Common.textAccent,
              Common.textPrimary,
              Common.text.primary,
            ]}
          >
            {' '}
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register
