import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase'
import { Header, Left, Body, Right, Button, Icon, Title, Subtitle, Thumbnail } from 'native-base'
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      header: (
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
              <Thumbnail small source={{ uri: params.profile.picture }} />
            </Button>
          </Left>
          <Body>
            <Title>{params.profile.given_name}</Title>
            <Subtitle>{params.lastSeen ? params.lastSeen : null}</Subtitle>
          </Body>
          <Right />
        </Header>
      ),
    }
  }

  static propTypes = {
    navigation: PropTypes.object,
  }

  state = {
    messages: [],
    user: this.props.navigation.state.params.user,
    profile: this.props.navigation.state.params.profile,
  }

  componentWillMount() {
    const { user, profile } = this.state
    this.getPresence(profile.uid)

    this.chatID =
      user.uid > profile.uid ? `${user.uid}-${profile.uid}` : `${profile.uid}-${user.uid}`
    this.watchChat()
  }

  onSend = (message) => {
    firebase
      .database()
      .ref('messages')
      .child(this.chatID)
      .push({
        ...message[0],
        createdAt: new Date().getTime(),
      })
  }

  getPresence = (uid) => {
    firebase
      .database()
      .ref('presence')
      .child(uid)
      .on('value', (snap) => {
        let lastSeen = 'online'
        if (snap.val() !== true) {
          // user is offline, set last seen
          lastSeen = moment(snap.val()).fromNow()
        }
        this.props.navigation.setParams({ lastSeen })
      })
  }

  watchChat = () => {
    firebase
      .database()
      .ref('messages')
      .child(this.chatID)
      .on('value', (snap) => {
        const messages = []
        snap.forEach((message) => {
          messages.push(message.val())
        })
        this.setState({
          messages: messages.reverse(),
        })
      })
  }

  render() {
    const { uid, picture } = this.state.profile
    return (
      <SafeAreaView style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          user={{ _id: uid, avatar: picture }}
          onSend={this.onSend}
        />
      </SafeAreaView>
    )
  }
}
