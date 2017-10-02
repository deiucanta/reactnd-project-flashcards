import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import initialData from './data'
import { scheduleNotification } from './utils/helpers'

import HomeView from './components/HomeView'
import DeckView from './components/DeckView'
import AddDeckView from './components/AddDeckView'
import AddQuestionView from './components/AddQuestionView'
import DeckQuizView from './components/DeckQuizView'

const Stack = StackNavigator({
  Home: { screen: HomeView },
  Deck: { screen: DeckView },
  AddDeck: { screen: AddDeckView },
  AddQuestion: { screen: AddQuestionView },
  DeckQuiz: { screen: DeckQuizView },
});

export default class App extends React.Component {
  state = {
    decks: null
  }
  async componentDidMount() {
    const value = await AsyncStorage.getItem('decks')
    const decks = value ? JSON.parse(value) : initialData

    this.setState({ decks })

    await scheduleNotification()
  }
  async persistDecks() {
    const value = this.state.decks
    await AsyncStorage.setItem('decks', JSON.stringify(value))
  }
  createDeck(title, callback) {
    const { decks } = this.state

    decks[title] = {
      title,
      questions: [],
    }

    this.setState({ decks }, () => this.persistDecks())
  }
  createQuestion(deckTitle, question, answer) {
    const { decks } = this.state

    decks[deckTitle].questions.push({
      question,
      answer,
    })

    this.setState({ decks }, () => this.persistDecks())
  }
  render() {
    const { decks } = this.state

    return decks
      ? <Stack screenProps={{
          decks,
          createDeck: this.createDeck.bind(this),
          createQuestion: this.createQuestion.bind(this),
        }} />
      : <ActivityIndicator />
  }
}
