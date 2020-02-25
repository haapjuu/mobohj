import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [num1, setNum1] = React.useState('');
  const [num2, setNum2] = React.useState('');
  const [result, setResult] = React.useState('');

  const calculateResultN = (num1, num2) => {
    setResult(parseFloat.num1 - parseFloat.num2);
  };

  const calculateResultP = (num1, num2) => {
    setResult(parseFloat.num1 + parseFloat.num2);
  };

  const calcSum = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum);
  }

  const calcSub = () => {
    const sub = parseFloat(num1) - parseFloat(num2);
    setResult(sub);
  }

  return (
  <View style={styles.maincontainer}>

    <View style={styles.inputcontainer}>

      <Text style={{fontSize: 18}}>{result}</Text>

      <TextInput
      style={{width:200, borderColor:'gray',  borderWidth:1}}
      onChangeText={num1 => setNum1(num1)}
      value={num1}/>

      <TextInput
      style={{width:200, borderColor:'gray',  borderWidth:1}}
      onChangeText={num2 => setNum2(num2)}
      value={num2}/>

    </View>

    <View style={styles.buttoncontainer}>

      <Button color="red" onPress={calcSum} title=" + "/>
      <Button color="red" onPress={calcSub} title=" - "/>

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
