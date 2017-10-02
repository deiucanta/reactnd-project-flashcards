import React from 'react'
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class HomeView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddDeck')}
      >
        <Text style={styles.buttonText}>Add Deck</Text>
      </TouchableOpacity>
    )
  })
  renderItem({ item }) {
    const { navigation } = this.props

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Deck', { title: item.title })}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.count}>{item.questions.length} cards</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps

    return (
      <FlatList
        data={Object.values(decks)}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={item => item.title}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
    marginBottom: 10
  },
  count: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    marginRight: 10
  },
  buttonText: {
    color: 'blue'
  }
});