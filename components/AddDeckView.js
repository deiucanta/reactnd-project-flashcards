import React from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import Button from './Button'

export default class AddDeckView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Deck',
  })
  state = {
    title: null
  }
  handleSubmitButton() {
    const { title } = this.state
    const { navigation, screenProps } = this.props
    const { createDeck } = screenProps

    if (title === null) {
      alert('Please enter the title')
      return false
    }

    createDeck(title)

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'Deck', params: { title } }),
      ]
    })

    navigation.dispatch(resetAction)
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={title => this.setState({ title })}
        />
        <Button type={2} onPress={this.handleSubmitButton.bind(this)}>Submit</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  input: {
    fontSize: 12,
    padding: 10,
    width: 200,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
  },
});