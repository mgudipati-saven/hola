import Expo from 'expo'
import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import { Button, Icon, Text } from 'native-base'
import axios from 'axios'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connectAlert } from '../components/Alert'

import { setUser } from '../actions/user'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#DD4B39',
  },
})

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    alertWithType: PropTypes.func,
  }

  state = {
    showSpinner: true,
  }

  componentDidMount() {
    // firebase.auth().signOut()
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) {
        this.firebaseRef = firebase.database().ref('users')
        this.firebaseRef.child(auth.uid).on('value', (snap) => {
          const user = snap.val()
          if (user != null) {
            this.firebaseRef.child(auth.uid).off('value')
            this.goMain(user)
          }
        })
      } else {
        this.setState({ showSpinner: false })
        this.props.dispatch(setUser({}))
      }
    })
  }

  goMain = (user) => {
    this.props.dispatch(setUser(user))
    this.props.navigation.navigate('Main')
  }

  cancelAuth = () => {
    this.props.alertWithType('info', 'Cancelled!', 'User cancelled authentication.')
    this.props.navigation.navigate('Login')
  }

  errorAuth = (error) => {
    this.props.alertWithType('error', 'Sorry!', error.message)
    this.props.navigation.navigate('Login')
  }

  googleLogin = async () => {
    this.setState({ showSpinner: true })

    // google auth
    try {
      const IOS_CLIENT_ID =
        '74288550940-sdkul607d1o754eb62husmoavdhk0hn4.apps.googleusercontent.com'
      const ANDROID_CLIENT_ID =
        '74288550940-g06qprbfbsbqfe3ftunkve7ucne0a76v.apps.googleusercontent.com'

      const { type, accessToken } = await Expo.Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      })

      if (type === 'success') {
        const { data } = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        // firebase auth
        const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken)
        const { uid } = await firebase.auth().signInWithCredential(credential)

        // create firebase user
        const defaults = {
          uid,
        }
        firebase
          .database()
          .ref('users')
          .child(uid)
          .update({ ...data, ...defaults })
      } else {
        this.cancelAuth()
      }
    } catch (error) {
      this.errorAuth(error)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {this.state.showSpinner ? (
            <ActivityIndicator animating={this.state.showSpinner} />
          ) : (
            <View>
              <Button style={styles.googleButton} iconLeft onPress={this.googleLogin}>
                <Icon name="logo-googleplus" />
                <Text>Sign in with Google</Text>
              </Button>
            </View>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

export default connect()(connectAlert(Login))
