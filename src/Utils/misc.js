import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { Config } from '@/Config'

export const getAvatar = user => {
  if (!user || !user.image) {
    return {
      uri: 'https://picsum.photos/200/300',
    }
  }

  const url = Config.BASE_URL + '/' + user.image
  return {
    uri: url,
  }
}

export const getVendorImage = vendor => {
  if (!vendor || !vendor.coverImage) {
    return {
      uri: 'https://picsum.photos/200/300',
    }
  }

  const url = Config.BASE_URL + '/' + vendor.coverImage
  return {
    uri: url,
    priority: FastImage.priority.high,
  }
}

export const getVendorLogo = vendor => {
  if (!vendor || !vendor.image) {
    return {
      uri: 'https://picsum.photos/200/300',
    }
  }

  const url = Config.BASE_URL + '/' + vendor.image
  return {
    uri: url,
    priority: FastImage.priority.high,
  }
}

export const getImageUrl = imgUrl => {
  if (!imgUrl) {
    return {
      uri: 'https://picsum.photos/200/300',
    }
  }

  const url = Config.BASE_URL + '/' + imgUrl
  return {
    uri: url,
    priority: FastImage.priority.high,
  }
}

export const getVendorOpenStatus = vendor => {
  const today = moment().day() + 1

  if (!vendor) {
    return 'Closed'
  }

  const { workHours } = vendor

  const todayWorkHours = workHours[today]

  if (!todayWorkHours) {
    return 'Closed'
  }

  const { start, end, enabled } = todayWorkHours

  if (!enabled) {
    return 'Closed'
  }

  const now = moment().format('HH:mm')
  const isOpen = moment(now, 'HH:mm').isBetween(
    moment(start, 'HH:mm'),
    moment(end, 'HH:mm'),
  )

  if (isOpen) {
    return 'Open'
  }

  return 'Closed'
}

export const getDuration = minutes => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0) {
    return `${hours}h ${mins}mins`
  }

  return `${mins}mins`
}
