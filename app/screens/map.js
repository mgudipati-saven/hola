import React, { Component } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native'
import { MapView } from 'expo'
import PropTypes from 'prop-types'
import GeoFire from 'geofire'
import firebase from 'firebase'

class Map extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  state = {
    showSpinner: true,
    profile: this.props.navigation.state.params.profile,
    loc: [37, -122],
  }

  componentWillMount() {
    const { uid } = this.state.profile
    this.getUserLocation(uid)
  }

  getUserLocation = async (uid) => {
    const geoFireRef = new GeoFire(firebase.database().ref('geoData'))
    const userLocation = await geoFireRef.get(uid)
    this.setState({ showSpinner: false })
    this.setState({ loc: userLocation })
  }

  render() {
    const { loc } = this.state
    const latlng = {
      latitude: loc[0],
      longitude: loc[1],
    }
    const region = {
      ...latlng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    }

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        {this.state.showSpinner ? (
          <ActivityIndicator animating={this.state.showSpinner} />
        ) : (
          <MapView style={{ flex: 1 }} region={region}>
            <MapView.Marker coordinate={latlng} />
          </MapView>
        )}
      </SafeAreaView>
    )
  }
}

export default Map
