import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    tokens: null,
  },
  reducers: {
    setCredentials: (state, { payload: { user, tokens } }) => {
      state.user = user
      state.tokens = tokens
    },
    clearCredentials: state => {
      state.user = null
      state.tokens = null
      state.employee = null
    },
    setUser: (state, { payload: { user } }) => {
      state.user = user
    },
  },
  extraReducers: builder => {},
})

export const { setCredentials, clearCredentials, setUser } = slice.actions

export default slice.reducer

export const selectCurrentUser = state => state.auth.user
