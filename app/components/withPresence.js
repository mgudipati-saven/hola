import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    left: '80%',
    bottom: '20%',
    width: 10,
    height: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
})

const withPresence = Comp => ({ isOnline, children, ...props }) => (
  <View>
    <Comp {...props}>{children}</Comp>
    {isOnline && <View style={styles.dot} />}
  </View>
)

export default withPresence
