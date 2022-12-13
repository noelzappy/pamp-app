import React, { useState, useEffect, Fragment } from 'react'
import { View, Text, ScrollView, RefreshControl, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useInfiniteQuery, useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Empty, Spacer, UHeader, VendorItem } from '@/Components'
import { Input, Icon } from '@rneui/base'
import Pill from '@/Components/Pills'
import { vendorApi } from '@/Services/modules/vendor'
import { displayError } from '@/Utils/errors'

const pillItems = [
  {
    title: 'All',
    onPress: () => {},
    active: true,
    id: 'all',
  },
  {
    title: 'Most Popular',
    onPress: () => {},
    active: false,
    id: 'popular',
  },
  {
    title: 'New',
    onPress: () => {},
    active: false,
    id: 'new',
  },

  {
    title: 'Most Popular',
    onPress: () => {},
    active: false,
    id: 'popular',
  },
  {
    title: 'New',
    onPress: () => {},
    active: false,
    id: 'new',
  },
]

const Container = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()
  const vendors = useInfiniteQuery(vendorApi.endpoints.getVendors)

  useEffect(() => {
    if (vendors.error) {
      displayError(vendors.error)
    }
  }, [vendors.error])

  const onVendorPress = vendor => {
    console.log(vendor)
  }

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <FlatList
        style={Layout.fill}
        contentContainerStyle={[Gutters.smallHPadding]}
        refreshControl={
          <RefreshControl
            refreshing={vendors.isLoading}
            onRefresh={vendors.refetch}
          />
        }
        data={vendors.data}
        renderItem={({ item }) => (
          <VendorItem vendor={item} onPress={onVendorPress} />
        )}
        ListHeaderComponent={
          <Fragment>
            <UHeader />
            <Input
              placeholder="Search for a service"
              inputContainerStyle={[Common.textInput]}
              leftIcon={
                <Icon name="search" type="feather" color={Colors.textLight} />
              }
            />
            <Pill pillItems={pillItems} />
            <Spacer size={20} />
          </Fragment>
        }
        ListEmptyComponent={() => {
          if (vendors.isLoading || vendors.isFetchingNextPage) return null
          return <Empty />
        }}
      />
    </SafeAreaView>
  )
}

export default Container
