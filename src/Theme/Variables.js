/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#EFEFEF',
  white: '#ffffff',
  text: '#393939',
  primary: '#86D694',
  accent: '#00463C',
  light: '#FAFAFA',
  textLight: '#BBB9BC',
  black: '#000000',
  success: '#28a745',
  error: '#dc3545',
  mediumLight: '#F5F5F5',
}

export const NavigationColors = {
  primary: Colors.light,
}

/**
 * FontSize
 */
export const FontSize = {
  small: 14,
  regular: 18,
  large: 30,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
