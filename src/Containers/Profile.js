import React, { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BHeader } from '@/Components'
import { useGetMeQuery } from '@/Services/modules/user'
import { Avatar, Icon } from '@rneui/base'
import { getAvatar } from '@/Utils/misc'
import { displayError } from '@/Utils/errors'
import { launchImageLibrary } from 'react-native-image-picker'

const Container = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()

  const { data: me, isLoading, isFetching, error } = useGetMeQuery()

  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    if (error) {
      displayError(error)
    }
  }, [error])

  const onPickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) return
      if (response.error) {
        displayError('There was an error while picking the image')
        return
      }

      const source = response.assets[0]

      setSelectedImage(source)
    })
  }

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <BHeader title="Profile" />

      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[Layout.fill, Gutters.smallHPadding]}
        refreshControl={
          <RefreshControl
            refreshing={isFetching || isLoading}
            onRefresh={() => {}}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[Layout.center]}>
          <TouchableOpacity
            onPress={() => {
              onPickImage()
            }}
          >
            <Avatar
              rounded
              size="large"
              source={selectedImage || getAvatar(me)}
              title={me?.firstName[0]}
            />
            <View
              style={[
                {
                  backgroundColor: Colors.primary,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderRadius: 50,
                  padding: 4,
                },
              ]}
            >
              <Icon
                name="camera"
                color={Colors.white}
                type="feather"
                size={14}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
