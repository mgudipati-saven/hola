import { StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Login from '../screens/login'
import Home from '../screens/home'
import Map from '../screens/map'

export default StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Home: {
      screen: Home,
    },
    Map: {
      screen: Map,
    },
  },
  {
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
)
