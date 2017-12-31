import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default class Chat extends Component {
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
