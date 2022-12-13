import FastImage from 'react-native-fast-image'
const { Config } = require('@/Config')

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
