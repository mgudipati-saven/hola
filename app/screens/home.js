import Expo from 'expo'
import React, { Component } from 'react'
import { View, FlatList, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import GeoFire from 'geofire'
import { connect } from 'react-redux'
import { ListItem, SearchBar } from 'react-native-elements'

import { setProfiles } from '../actions/user'
import Swiper from '../components/swiper'
import Profile from '../screens/profile'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    width,
    height,
  },
})

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    profiles: PropTypes.array,
    user: PropTypes.object,
    navigation: PropTypes.object,
  }

  componentWillMount() {
    this.updateUserLocation()
    firebase
      .database()
      .ref()
      .child('users')
      .once('value', (snap) => {
        const profiles = []
        snap.forEach((profile) => {
          profiles.push(profile.val())
        })
        this.props.dispatch(setProfiles(profiles))
      })
  }

  updateUserLocation = async () => {
    const { Permissions, Location } = Expo
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false })
      const { latitude, longitude } = location.coords
      const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
      geoFireRef.set(this.props.user.uid, [latitude, longitude])
    }
  }

  renderItem = ({ item }) => (
    <ListItem
      key={item.id}
      containerStyle={{ borderBottomWidth: 0 }}
      roundAvatar
      avatar={{ uri: item.picture }}
      title={item.name}
      titleStyle={{ fontSize: 18 }}
      subtitle={item.email}
      subtitleStyle={{ fontSize: 12, color: 'darkgrey' }}
      rightIcon={{ name: 'map' }}
      onPressRightIcon={() => {
        this.props.navigation.navigate('Map', { user: item })
      }}
    />
  )

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '75%',
        backgroundColor: 'lightgrey',
        marginLeft: '15%',
        marginRight: '10%',
      }}
    />
  )

  renderHeader = () => <SearchBar placeholder="Search..." lightTheme round />

  render() {
    return (
      <SafeAreaView>
        <Swiper>
          <View style={styles.screen}>
            <Profile />
          </View>
          <View style={styles.screen}>
            <FlatList
              data={this.props.profiles}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              keyExtractor={item => item.id}
            />
          </View>
        </Swiper>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  profiles: state.user.profiles,
  user: state.user.user,
})

export default connect(mapStateToProps)(Home)
