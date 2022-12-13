/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { height, width } from '@/Utils/dimensions'
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import textStyles from './components/Texts'

const RADIUS = 20

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  return {
    button: buttonStyles({ Colors, ...args }),
    text: textStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.light,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      backgroundLight: {
        backgroundColor: Colors.mediumLight,
      },
      textInput: {
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 60,
        borderBottomWidth: 0,
        borderRadius: RADIUS,
        paddingHorizontal: 20,
      },
      bordered: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        borderTopColor: Colors.primary,
        borderTopWidth: 1,
      },
      codeFieldRoot: { padding: 20, minHeight: 300 },
      codeFieldCell: {
        width: width(17),
        height: height(8),
        lineHeight: height(8),
        fontSize: 24,
        borderWidth: 1,
        borderColor: Colors.primary,
        textAlign: 'center',
        borderRadius: RADIUS,
      },
      codeFieldFocusCell: {
        borderColor: '#000',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      TextLink: {
        color: Colors.primary,
        textDecorationLine: 'underline',
      },
      pill: {
        backgroundColor: Colors.light,
        borderRadius: RADIUS,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
      },
      pillActive: {
        backgroundColor: Colors.primary,
        borderRadius: RADIUS,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderColor: Colors.light,
        borderWidth: 1,
      },
      rounded: {
        borderRadius: RADIUS,
      },
    }),
  }
}
