import Expo, { Notifications } from 'expo'
import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Provider } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'

import Navigator from './config/routes'
import store from './config/store'
import { AlertProvider } from './components/Alert'
import registerForPushNotificationsAsync from './services/notifications'

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

// Setup Extended Stylesheet
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

class AppContainer extends Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })

    // Register for Push Notifications
    registerForPushNotificationsAsync()
    Notifications.addListener((notification) => {
      console.log('Notifications: ', notification)
    })
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider>
          <Navigator />
        </AlertProvider>
      </Provider>
    )
  }
}

export default AppContainer
