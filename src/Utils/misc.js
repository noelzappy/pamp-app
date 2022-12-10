const { Config } = require('@/Config')

export const getAvatar = user => {
  if (!user || !user.image) {
    return {
      uri: 'https://picsum.photos/200/300',
    }
  }

  const url = Config.BASE_URL + '/uploads/' + user.image
  return {
    uri: url,
  }
}
