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
import { miscApi } from '@/Services/modules/misc'

const Container = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()
  const vendors = useInfiniteQuery(vendorApi.endpoints.getVendors)
  const categories = useInfiniteQuery(miscApi.endpoints.getCategories)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const myCategories = () => {
    if (!categories.data)
      return [
        {
          title: 'All',
          onPress: () => {
            setSelectedCategory('all')
          },

          id: 'all',
        },
      ]
    const cat = categories.data.map(item => ({
      ...item,
      onPress: () => {
        setSelectedCategory(item.id)
      },
      title: item.name,
    }))

    return [
      {
        title: 'All',
        onPress: () => {
          setSelectedCategory('all')
        },
        active: true,
        id: 'all',
      },
      ...cat,
    ]
  }

  useEffect(() => {
    if (vendors.error) {
      displayError(vendors.error)
    }
  }, [vendors.error])

  const onVendorPress = vendor => {
    console.log(vendor)
  }

  useEffect(() => {
    if (selectedCategory === 'all') {
      vendors.trigger()
    } else {
      vendors.trigger({
        category: selectedCategory,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <FlatList
        style={Layout.fill}
        contentContainerStyle={[Gutters.smallHPadding]}
        refreshControl={
          <RefreshControl
            refreshing={vendors.isLoading || categories.isFetchingNextPage}
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
            <Pill pillItems={myCategories()} activeItem={selectedCategory} />
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
