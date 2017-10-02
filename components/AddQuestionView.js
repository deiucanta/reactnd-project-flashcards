import React from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import Button from './Button'

export default class AddQuestionView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Question',
  })
  state = {
    question: null,
    answer: null,
  }
  handleSubmitButton() {
    const { question, answer } = this.state
    const { navigation, screenProps } = this.props
    const { createQuestion } = screenProps
    const { deckTitle } = navigation.state.params

    if (question === null) {
      alert('Please enter the question')
      return false
    }

    if (answer === null) {
      alert('Please enter the answer')
      return false
    }

    createQuestion(deckTitle, question, answer)

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'Deck', params: { title: deckTitle } }),
      ]
    })

    navigation.dispatch(resetAction)
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Question"
          onChangeText={question => this.setState({ question })}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
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