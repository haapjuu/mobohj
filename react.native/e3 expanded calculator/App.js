import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';

export default function App() {
  const [num1, setNum1] = React.useState('');
  const [num2, setNum2] = React.useState('');
  const [result, setResult] = React.useState('');

  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([]);

  const calcHistory = () => {
    
  }

  const calcSum = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum);
    setText(num1 + '+' + num2 + '=' + result);
    setData([...data, {key:text}]);
  }

  const calcSub = () => {
    const sub = parseFloat(num1) - parseFloat(num2);
    setResult(sub);
    setText(num1 + '-' + num2 + '=' + result);
    setData([...data, {key:text}]);
  }

  return (
  <View style={styles.maincontainer}>

    <View style={styles.inputcontainer}>

      <Text style={{fontSize: 18}}>{result}</Text>

      <TextInput
      style={{width:200, borderColor:'gray',  borderWidth:1}}
      onChangeText={num1 => setNum1(num1)}
      value={num1}
      keyboardType= 'numeric'/>

      <TextInput
      style={{width:200, borderColor:'gray',  borderWidth:1}}
      onChangeText={num2 => setNum2(num2)}
      value={num2}
      keyboardType= 'numeric'/>

    </View>

    <View style={styles.buttoncontainer}>

      <Button color= "red" onPress={calcSum} title=" + "/>
      <Button color= "red" onPress={calcSub} title="  -  "/>

    </View>

    <View style={styles.calchistory}>

      <Text style={{fontSize: 18}}>History</Text>

      <FlatList
      data={data}
      renderItem={({item}) => <Text>{item.key}</ Text>}/>

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
  calchistory: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});
