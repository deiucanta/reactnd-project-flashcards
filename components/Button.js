import React from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'

const types = {
  // background, border, text
  1: ['white', 'black', 'black'],
  2: ['black', 'black', 'white'],
  3: ['green', 'green', 'white'],
  4: ['red', 'red', 'white'],
}

export default class Button extends React.Component {
  static defaultProps = {
    type: 1,
  }
  render() {
    const { onPress, type } = this.props

    return (
      <TouchableOpacity onPress={onPress} style={{
        width: 200,
        alignItems: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: types[type][0],
        borderWidth: 0.5,
        borderColor: types[type][1],
        borderRadius: 5,
      }}>
        <Text style={{ color: types[type][2] }}>{this.props.children}</Text>
      </TouchableOpacity>
    )
  }
}