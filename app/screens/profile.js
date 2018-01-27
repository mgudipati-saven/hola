import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import { Thumbnail } from 'native-base'

const size = 120

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profile: {
    alignItems: 'center',
    marginTop: 10,
  },
  thumbnail: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
})

class Profile extends Component {
  static navigationOptions = {
    headerTitle: 'Profile',
  }

  static propTypes = {
    user: PropTypes.object,
    navigation: PropTypes.object,
  }

  onLogoutPress = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('Login')
  }

  render() {
    const { name, picture, email } = this.props.user

    return (
      <SafeAreaView style={styles.container}>
        <Thumbnail
          square
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1040544202/Saven_Logo_png_400x400.png',
          }}
        />
        <View style={styles.profile}>
          <Avatar xlarge rounded source={{ uri: picture }} />
          <Text style={{ fontSize: 20, padding: 10 }}>{name}</Text>
          <Text style={{ fontSize: 14, color: 'lightgray' }}>{email}</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(Profile)
