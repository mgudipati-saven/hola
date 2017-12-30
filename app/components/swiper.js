import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: '#ffffff',
  },
  indicatorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  indicatorActive: {
    backgroundColor: 'black',
  },
})

export default class Swiper extends Component {
  static propTypes = {
    children: PropTypes.array,
  }

  state = {
    activeIndex: 0,
  }

  onScroll = (e) => {
    const { layoutMeasurement, contentOffset } = e.nativeEvent
    const activeIndex = Math.floor(contentOffset.x / layoutMeasurement.width)
    this.setState({ activeIndex })
  }

  render() {
    return (
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={this.onScroll}
          scrollEventThrottle={64}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.children}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {this.props.children.map((value, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                this.state.activeIndex === index ? styles.indicatorActive : {},
              ]}
            />
          ))}
        </View>
      </View>
    )
  }
}
