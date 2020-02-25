import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {

  const [correctN, setCorrectN] = React.useState(Math.floor(Math.random() * 100) + 1);
  const [guessN, setGuessN] = React.useState('');
  const [tries, setTries] = React.useState(1);
  const [textout, setTextout] = React.useState('Guess a number between 1-100');

  const makeGuess = () => {
    setTries (tries + 1);

    if(guessN < correctN) {
      setTextout('Your guess ' + guessN + ' is too low')
    } 
    
    if(guessN > correctN) {
      setTextout('Your guess ' + guessN + ' is too high')
    } 

    if(guessN == correctN) {
      setTextout('Your guess ' + guessN + ' is CORRECT')
      Alert.alert('You guessed the number in ' + tries + ' attempts.')
    }

  }

  return (
  <View style={styles.maincontainer}>

    <View style={styles.inputcontainer}>

      <Text style={{fontSize: 18}}>{textout}</Text>
    
      <TextInput style={{width:200, borderColor:'gray',  borderWidth:1}}
      onChangeText={guessN => setGuessN(guessN)}
      value={guessN}
      keyboardType='numeric'/>

    </View>

    <View style={styles.buttoncontainer}>

      <Button color="red" onPress={makeGuess} title="MAKE GUESS"/>

    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputcontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttoncontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 20,
    width: 150,
  },
});
