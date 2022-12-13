import React, { useEffect } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { THeader } from '@/Components'
import { Avatar, Icon, ListItem } from '@rneui/base'
import { useGetMeQuery } from '@/Services/modules/user'
import { displayError } from '@/Utils/errors'
import { getAvatar } from '@/Utils/misc'
import { clearCredentials } from '@/Store/Auth'

const menuOne = [
  {
    title: 'Change Password',
    icon: 'lock',
    route: 'ChangePassword',
  },
  {
    title: 'Payment Methods',
    icon: 'credit-card',
    route: 'PaymentMethods',
  },
]
const menuTwo = [
  {
    title: 'Change Password',
    icon: 'lock',
    route: 'ChangePassword',
  },
  {
    title: 'Payment Methods',
    icon: 'credit-card',
    route: 'PaymentMethods',
  },
]
const menuThree = [
  {
    title: 'Change Password',
    icon: 'lock',
    route: 'ChangePassword',
  },
  {
    title: 'Payment Methods',
    icon: 'credit-card',
    route: 'PaymentMethods',
  },
]

const Container = ({ navigation }) => {
  const { t } = useTranslation()
  const { Common, Gutters, Layout, Colors } = useTheme()

  const { data: me, isLoading, isFetching, error } = useGetMeQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      displayError(error)
    }
  }, [error])

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
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
        <THeader title="Settings" />
        <View style={[Layout.center]}>
          <Avatar
            rounded
            size="large"
            source={getAvatar(me)}
            title={me?.firstName[0]}
          />
        </View>
        <View style={[Gutters.smallTMargin, Gutters.largeBMargin]}>
          <ListItem
            containerStyle={[
              Gutters.smallBMargin,
              {
                backgroundColor: Colors.inputBackground,
                borderRadius: 10,
              },
            ]}
            onPress={() => {
              navigation.navigate('Profile')
            }}
          >
            <Icon name="user" type="feather" color={Colors.primary} />
            <ListItem.Content>
              <ListItem.Title>Profile </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </View>
        <View
          style={[
            {
              backgroundColor: Colors.inputBackground,
              borderRadius: 10,
            },
            Gutters.largeBMargin,
          ]}
        >
          {menuOne.map((item, index) => {
            return (
              <ListItem
                containerStyle={{
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 10,
                }}
                index={index + Math.random()}
              >
                <Icon name={item.icon} type="feather" color={Colors.primary} />
                <ListItem.Content>
                  <ListItem.Title>{item.title} </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )
          })}
        </View>
        <View
          style={[
            {
              backgroundColor: Colors.inputBackground,
              borderRadius: 10,
            },
            Gutters.largeBMargin,
          ]}
        >
          {menuTwo.map((item, index) => {
            return (
              <ListItem
                containerStyle={{
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 10,
                }}
                index={index + Math.random()}
              >
                <Icon name={item.icon} type="feather" color={Colors.primary} />
                <ListItem.Content>
                  <ListItem.Title>{item.title} </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )
          })}
        </View>
        <View
          style={[
            {
              backgroundColor: Colors.inputBackground,
              borderRadius: 10,
            },
          ]}
        >
          {menuThree.map((item, index) => {
            return (
              <ListItem
                containerStyle={{
                  backgroundColor: Colors.inputBackground,
                  borderRadius: 10,
                }}
                index={index + Math.random()}
              >
                <Icon name={item.icon} type="feather" color={Colors.primary} />
                <ListItem.Content>
                  <ListItem.Title>{item.title} </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            )
          })}
        </View>

        <View style={[Gutters.largeTMargin]}>
          <ListItem
            containerStyle={[
              Gutters.smallBMargin,
              {
                backgroundColor: Colors.inputBackground,
                borderRadius: 10,
              },
            ]}
            onPress={() => {
              dispatch(clearCredentials())
            }}
          >
            <Icon name="logout" type="material" color={Colors.error} />
            <ListItem.Content>
              <ListItem.Title>Logout </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
