import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    pages: ['feed','profile','createpost','home','signup','login'],
    userdetails:JSON.parse(localStorage.getItem("userdetails"))
  },
  reducers: {
    logout: (state) => {
      state.userdetails = null;
    }
  }
})

export const { logout } = counterSlice.actions

const store = configureStore({
  reducer: counterSlice.reducer
})


export default store