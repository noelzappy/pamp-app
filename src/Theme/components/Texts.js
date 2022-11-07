import { StyleSheet } from 'react-native'

const RADIUS = 20

export default function ({ Colors, Gutters, Layout, FontSize }) {
  const base = {
    color: Colors.text,
  }
  const regular = {
    ...base,
    fontSize: FontSize.regular,
  }

  const small = {
    ...base,
    fontSize: FontSize.small,
  }

  const accent = {
    ...base,
    color: Colors.accent,
  }

  const primary = {
    ...accent,
    color: Colors.primary,
  }

  return StyleSheet.create({
    base,
    regular,
    small,
    accent,
    primary,
    bold: {
      ...base,
      fontWeight: 'bold',
    },
  })
}
