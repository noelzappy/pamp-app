import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators'
import DropdownAlert from 'react-native-dropdownalert'
import './Translations'
import { Toast } from './Components/Toast'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApplicationNavigator />
      <DropdownAlert ref={ref => Toast.setDropDown(ref)} />
    </PersistGate>
  </Provider>
)

export default App
