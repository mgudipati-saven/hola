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
          navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.name}`,
          }),
        },
        Map: {
          screen: Map,
          navigationOptions: {
            title: 'User Location',
          },
        },
        Chat: {
          screen: Chat,
          navigationOptions: {
            title: 'Chat',
          },
        },
      }),
    },
  },
  {
    headerMode: 'none',
    cardStyle: { paddingTop: StatusBar.currentHeight },
  },
)
