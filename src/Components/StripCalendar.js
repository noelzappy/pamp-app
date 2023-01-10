import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  Calendar,
} from 'react-native-calendars'

const StripCalendar = ({ size }) => {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  )
}

StripCalendar.propTypes = {
  size: PropTypes.number,
}

StripCalendar.defaultProps = {
  size: 100,
}

export default StripCalendar
