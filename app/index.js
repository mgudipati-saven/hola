import React from 'react'
import * as firebase from 'firebase'
import { Provider } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'

import Navigator from './config/routes'
import store from './config/store'
import { AlertProvider } from './components/Alert'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB3Dg2E9dqy-o7tXk_2-QPkUFvaTVdtR_s',
  authDomain: 'hola-b4c27.firebaseapp.com',
  databaseURL: 'https://hola-b4c27.firebaseio.com',
  projectId: 'hola-b4c27',
  storageBucket: '',
  messagingSenderId: '74288550940',
}
firebase.initializeApp(firebaseConfig)

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',

  $white: '#FFFFFF',
  $lightGray: '#F0F0F0',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $darkText: '#343434',
})

export default () => (
  <Provider store={store}>
    <AlertProvider>
      <Navigator />
    </AlertProvider>
  </Provider>
)
