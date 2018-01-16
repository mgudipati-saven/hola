import { StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Login from '../screens/login'
import Home from '../screens/home'
import Map from '../screens/map'
import Chat from '../screens/chat'

export default StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Main: {
      screen: StackNavigator({
        Home: {
          screen: Home,
          navigationOptions: {
            title: 'Home',
          },
        },
        Map: {
          screen: Map,
        },
        Chat: {
          screen: Chat,
        },
      }),
    },
  },
  {
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
)
