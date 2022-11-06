import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wrapper = ({ noScroll, refreshing, onRefresh, children }) => {
  const { Layout, Common, Gutters } = useTheme()

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundPrimary]}>
      {noScroll ? (
        { children }
      ) : (
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={[Layout.fill, Gutters.smallHPadding]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

Wrapper.propTypes = {
  noScroll: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
}

Wrapper.defaultProps = {
  noScroll: false,
  refreshing: false,
  onRefresh: () => {},
}

export default Wrapper
