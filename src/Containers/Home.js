import React, { Fragment } from 'react'
import { RefreshControl, FlatList } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useInfiniteQuery, useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CategoryItem, Empty, Spacer, UHeader } from '@/Components'
import { Input, Icon } from '@rneui/base'
import Pill from '@/Components/Pills'
import { miscApi } from '@/Services/modules/misc'

const Container = ({ navigation }) => {
  const { t } = useTranslation()
  const { Common, Gutters, Layout, Colors } = useTheme()

  const categories = useInfiniteQuery(miscApi.endpoints.getCategories)

  const onItemPress = item => {
    navigation.navigate('Vendors', { categoryId: item.id })
  }

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      <FlatList
        style={Layout.fill}
        contentContainerStyle={[Gutters.smallHPadding]}
        refreshControl={
          <RefreshControl
            refreshing={categories.isFetchingNextPage}
            onRefresh={categories.refetch}
          />
        }
        data={categories.data}
        renderItem={({ item }) => (
          <CategoryItem item={item} onPress={onItemPress} />
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
            <Pill pillItems={[]} />
            <Spacer size={20} />
          </Fragment>
        }
        ListEmptyComponent={() => {
          if (categories.isLoading || categories.isFetchingNextPage) return null
          return <Empty />
        }}
      />
    </SafeAreaView>
  )
}

export default Container
