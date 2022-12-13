import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CHeader, Spacer } from '@/Components'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { Button, Dialog } from '@rneui/base'
import {
  useSendEmailVerificationMutation,
  useSendPhoneVerificationMutation,
  useVerifyEmailMutation,
  useVerifyPhoneMutation,
} from '@/Services/modules/auth'
import { displayError } from '@/Utils/errors'
import { Toast } from '@/Components/Toast'
import { useLazyGetMeQuery } from '@/Services/modules/user'
import { useDispatch } from 'react-redux'
import { setUser } from '@/Store/Auth'
import { navigateAndReset } from '@/Navigators/utils'

const Container = ({ route, navigation }) => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const { method } = route.params
  const dispatch = useDispatch()

  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: 4 })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const [sendEmailVerification, { isLoading, error, isSuccess }] =
    useSendEmailVerificationMutation()
  const [
    sendPhoneVerification,
    { isLoading: isLoadingPhone, error: errorPhone, isSuccess: isSuccessPhone },
  ] = useSendPhoneVerificationMutation()

  const [getMe, { isLoading: loadingMe, error: errorMe }] = useLazyGetMeQuery()

  const [
    verifyEmail,
    { isLoading: isLoadingEmail, error: errorEmail, isSuccess: emailSuccess },
  ] = useVerifyEmailMutation()
  const [
    verifyPhone,
    {
      isLoading: isLoadingPhoneVerification,
      error: errorPhoneVerification,
      isSuccess: isSuccessPhoneVerification,
    },
  ] = useVerifyPhoneMutation()

  const handleReSend = () => {
    if (method === 'email') {
      sendEmailVerification()
    } else {
      sendPhoneVerification()
    }
  }

  const handleVerify = () => {
    if (method === 'email') {
      verifyEmail({ verificationCode: value })
    } else {
      verifyPhone({ verificationCode: value })
    }
  }

  useEffect(() => {
    if (
      error ||
      errorPhone ||
      errorEmail ||
      errorPhoneVerification ||
      errorMe
    ) {
      displayError(
        error || errorPhone || errorEmail || errorPhoneVerification || errorMe,
      )
    }
  }, [error, errorPhone, errorEmail, errorPhoneVerification, errorMe])

  useEffect(() => {
    if (isSuccess || isSuccessPhone) {
      Toast.show('success', 'Verification code sent!')
    }
  }, [isSuccess, isSuccessPhone])

  useEffect(() => {
    async function run() {
      if (emailSuccess || isSuccessPhoneVerification) {
        Toast.show('success', 'Your account has been verified!')
        const { data } = await getMe()
        if (data) {
          console.log(data)
          dispatch(
            setUser({
              user: data,
            }),

            navigation.replace('Main'),
          )
        }
      }
    }
    run()
  }, [emailSuccess, isSuccessPhoneVerification, getMe, dispatch, navigation])

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <CHeader
        title="Verify your Account"
        subtitle={`Please enter the verification code sent to your ${method}`}
        back={false}
      />
      <Spacer size={20} />
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[Gutters.smallHPadding]}
      >
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={4}
          keyboardType="number-pad"
          rootStyle={[Gutters.largeMargin]}
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                Common.codeFieldCell,
                Layout.center,
                isFocused && Common.codeFieldFocusCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <Spacer size={20} />

        <View style={[Layout.colCenter]}>
          <Text
            style={[
              Fonts.textRegular,
              Gutters.smallBMargin,
              Common.text.bold,
              {
                color: Colors.accent,
              },
            ]}
            onPress={handleReSend}
          >
            Resend Code
          </Text>
          <Spacer size={10} />
          <Button
            title={`Verify ${method}`}
            buttonStyle={[Common.button.rounded]}
            disabled={isLoading || isLoadingPhone || value.length < 4}
            onPress={handleVerify}
            loading={isLoadingEmail || isLoadingPhoneVerification || loadingMe}
          />
          <Spacer size={10} />
          <Text
            style={[Fonts.textRegular, Gutters.smallBMargin, Common.TextLink]}
            onPress={() => {
              navigation.goBack()
            }}
          >
            Change Information
          </Text>
        </View>
        <Dialog visible={loadingMe}>
          <Dialog.Loading />
        </Dialog>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
