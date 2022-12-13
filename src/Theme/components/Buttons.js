import { StyleSheet } from 'react-native'

const RADIUS = 20

export default function ({ Colors, Gutters, Layout }) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 50,
    backgroundColor: Colors.primary,
  }
  const rounded = {
    ...base,
    borderRadius: RADIUS,
  }
  const large = {
    ...base,
    borderRadius: RADIUS,
    height: 60,
  }

  const danger = {
    ...base,
    backgroundColor: Colors.danger,
  }

  return StyleSheet.create({
    base,
    rounded,
    large,
    danger,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  })
}
