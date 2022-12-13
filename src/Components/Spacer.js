import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const Spacer = ({ size }) => {
  return <View style={{ height: size }} />
}

Spacer.propTypes = {
  size: PropTypes.number,
}

Spacer.defaultProps = {
  size: 100,
}

export default Spacer
