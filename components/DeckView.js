import React from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native'

import Button from './Button'

export default class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })
  render() {
    const { navigation, screenProps } = this.props
    const { title } = navigation.state.params
    const deck = screenProps.decks[title]

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.count}>{deck.questions.length} cards</Text>
        <View style={{ marginTop: 50 }}>
          <Button
            type={1}
            onPress={() => navigation.navigate('AddQuestion', { deckTitle: title })}
          >
            Add Question
          </Button>
          <Button
            type={2}
            onPress={() => navigation.navigate('DeckQuiz', { title })}
          >
            Start Quiz
          </Button>
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
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  count: {
    fontSize: 16,
    color: 'gray',
  },
});