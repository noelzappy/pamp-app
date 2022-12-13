import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CHeader, Spacer } from '@/Components'
import { Button, CheckBox } from '@rneui/base'
import {
  useSendEmailVerificationMutation,
  useSendPhoneVerificationMutation,
} from '@/Services/modules/auth'
import { displayError } from '@/Utils/errors'
import { Toast } from '@/Components/Toast'

const Container = ({ navigation }) => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  const [method, setMethod] = useState('email')

  const [sendEmailVerification, { isLoading, error, isSuccess }] =
    useSendEmailVerificationMutation()
  const [
    sendPhoneVerification,
    { isLoading: isLoadingPhone, error: errorPhone, isSuccess: isSuccessPhone },
  ] = useSendPhoneVerificationMutation()

  const handleSend = () => {
    if (method === 'email') {
      sendEmailVerification()
    } else {
      sendPhoneVerification()
    }
  }

  useEffect(() => {
    if (error || errorPhone) {
      displayError(error || errorPhone)
    }
  }, [error, errorPhone])

  useEffect(() => {
    if (isSuccess || isSuccessPhone) {
      Toast.show('success', 'Verification code sent!')
      navigation.navigate('VerifyConfirmation', { method })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isSuccessPhone])

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <CHeader
        title="Verify your Account"
        subtitle="Choose a verification method"
        back={false}
      />
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[Gutters.smallHPadding]}
      >
        <Spacer size={30} />
        <View style={[Common.bordered]}>
          <CheckBox
            title={
              <View style={[Gutters.smallMargin]}>
                <Text style={[Fonts.textSmall, Common.textLight]}>
                  Email verification to
                </Text>
                <Text style={[Fonts.textSmall, Common.textLight]}>
                  {user.email}
                </Text>
              </View>
            }
            checked={method === 'email'}
            onPress={() => setMethod('email')}
            checkedColor={Colors.primary}
            center
            containerStyle={[Common.backgroundPrimary]}
          />
        </View>
        <View
          style={[
            Common.bordered,

            {
              borderTopWidth: 0,
            },
          ]}
        >
          <CheckBox
            title={
              <View style={[Gutters.smallMargin]}>
                <Text style={[Fonts.textSmall, Common.textLight]}>
                  Text verification to
                </Text>
                <Text style={[Fonts.textSmall, Common.textLight]}>
                  {user.phoneNumber}
                </Text>
              </View>
            }
            checked={method === 'phone'}
            onPress={() => setMethod('phone')}
            checkedColor={Colors.primary}
            center
            containerStyle={[Common.backgroundPrimary]}
          />
        </View>

        <View>
          <Spacer />
          <Button
            title="Send"
            buttonStyle={[Common.button.rounded]}
            loading={isLoading || isLoadingPhone}
            onPress={handleSend}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
