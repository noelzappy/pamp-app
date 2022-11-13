import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CHeader, Spacer } from '@/Components'
import { useTheme } from '@/Hooks'
import { Button, Input, Icon, CheckBox } from '@rneui/base'
import { Formik } from 'formik'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLoginMutation } from '@/Services/modules/auth'
import { setCredentials } from '@/Store/Auth'
import { displayError } from '@/Utils/errors'

const Login = ({ navigation }) => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()

  const [login, { isLoading, error }] = useLoginMutation()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async values => {
    const { data } = await login(values)

    dispatch(setCredentials(data))
  }

  useEffect(() => {
    if (error) {
      displayError(error)
    }
  }, [error])

  return (
    <SafeAreaView
      style={[Layout.fill, Common.backgroundPrimary, Gutters.smallHPadding]}
    >
      <CHeader
        back={false}
        title="Welcome"
        subtitle="Please sign into your account"
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Spacer size={40} />
        <Formik
          initialValues={{
            email: '',
            password: '',
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
                placeholder="try@pamp.com"
                inputContainerStyle={[Common.textInput]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={touched.email && errors.email}
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
                title="Login"
                onPress={handleSubmit}
                loading={isLoading}
                buttonStyle={[Common.button.large]}
              />
            </View>
          )}
        </Formik>
        <Spacer size={20} />
        <Text
          style={[Fonts.textCenter]}
          onPress={() => navigation.navigate('Register')}
        >
          Don't have and account?
          <Text
            style={[
              Fonts.textCenter,
              Common.textAccent,
              Common.textPrimary,
              Common.text.primary,
            ]}
          >
            {' '}
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
