import React from 'react'
import {
  Text,
  View,
  Switch,
  StyleSheet,
} from 'react-native'

import { scheduleNotification, clearNotification } from '../utils/helpers'
import Button from './Button'

export default class DeckQuizView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Quiz',
  })
  state = {
    currentCard: 0,
    showAnswer: false,
    correctAnswers: 0,
  }
  async componentDidMount() {
    await clearNotification()
    await scheduleNotification()
  }
  handleCorrectButton() {
    this.setState(state => ({
      correctAnswers: state.correctAnswers + 1,
      currentCard: state.currentCard + 1,
      showAnswer: false,
    }))
  }
  handleIncorrectButton() {
    this.setState(state => ({
      currentCard: state.currentCard + 1,
      showAnswer: false,
    }))
  }
  handleRestartButton() {
    this.setState(state => ({
      currentCard: 0,
      showAnswer: false,
      correctAnswers: 0,
    }))
  }
  handleBackButton() {
    const { navigation } = this.props

    navigation.goBack()
  }
  renderResults(correctAnswers, cardCount) {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>
          {Math.floor((correctAnswers / cardCount) * 100)}%
        </Text>
        <View style={{ marginTop: 50 }}>
          <Button type={1} onPress={this.handleRestartButton.bind(this)}>Restart Quiz</Button>
          <Button type={2} onPress={this.handleBackButton.bind(this)}>Back to Deck</Button>
        </View>
      </View>
    )
  }
  render() {
    const { currentCard, showAnswer, correctAnswers } = this.state
    const { navigation, screenProps } = this.props
    const { title } = navigation.state.params
    const deck = screenProps.decks[title]
    const card = deck.questions[currentCard]

    if (currentCard + 1 > deck.questions.length) {
      return this.renderResults(correctAnswers, deck.questions.length)
    }

    return (
      <View style={styles.container}>
        <Text>{currentCard + 1} / {deck.questions.length}</Text>
        {showAnswer ? (
          <Text style={styles.content}>{card.answer}</Text>
        ) : (
          <Text style={styles.content}>{card.question}</Text>
        )}
        <Text style={{ marginBottom: 5 }}>View Answer</Text>
        <Switch value={showAnswer}
          onValueChange={showAnswer => this.setState({ showAnswer })} />
        <View style={{ marginTop: 50 }}>
          <Button type={3} onPress={this.handleCorrectButton.bind(this)}>Correct</Button>
          <Button type={4} onPress={this.handleIncorrectButton.bind(this)}>Incorrect</Button>
        </View>
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
  content: {
    fontSize: 32,
    textAlign: 'center',
    padding: 30,
  },
});