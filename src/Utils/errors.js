import { Toast } from '@/Components/Toast'

export function getErrorMsg(errorObj) {
  if (!errorObj) return ''
  if (typeof errorObj === 'string') return errorObj
  if (errorObj.message === 'Network Error') return 'No connection'
  const { data } = errorObj
  if (!data) return ''
  const { message, error, errors } = data
  if (message) return message
  if (error) return error
  if (!errors) return ''

  return ''
}

export function extractErrorInfo(error) {
  try {
    if (error.response && error.response.status == 422) return error
    if (!error.response && error.message) {
      return { code: null, message: error.message }
    }
    return { code: error.response.status, message: error.response.data.error }
  } catch (e) {
    return { message: 'Unknown error occurred' }
  }
}

export const displayError = error => {
  const mm = getErrorMsg(error) || 'Unknown error occurred'
  Toast.show('error', 'Error', mm)
}
