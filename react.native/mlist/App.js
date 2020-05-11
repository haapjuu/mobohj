import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mlist.db');

export default function App() {
  const [mitem, setMitem] = useState([]);
  let [sdate, setSdate] = useState('');
  let [subject, setSubject] = useState('');
  let [description, setDescription] = useState('');
  

  useEffect(() => {
    createDB();
    updateList();    
  }, []);

  const createDB = () => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists mlist (id integer primary key not null, subject text, sdate text, description text);');
    });
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from mlist;', [], (_, { rows }) =>
        setMitem(rows._array)
      ); 
    });
  }

  const clearDB = () => {
    db.transaction(tx => {
      try {
        tx.executeSql("delete from mlist");
        console.log('mlist cleared');
      }
      catch {
        console.log('mlist clear error');
      }
    });
    updateList(); 
  }

  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into mlist (subject, sdate, description) values (?, ?, ?);', [subject, sdate, description]);    
      }, null, updateList, clearInputs
    )
  }

  const clearInputs = () => {
    setSubject('');
    setSdate('');
    setDescription('');
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from mlist where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '100%',
          borderTopWidth: 2,
          borderColor: 'rgba(81, 213, 185, .6)',
          marginVertical: 5,
        }}
      />
    );
  };

  return (
    <View style={styles.maincontainer}>

        

        <View style={styles.inputcontainer}>

          <Text>Subject</Text>
          <TextInput style={{borderColor:"black", borderWidth:1, width:"30%"}}
            onChangeText={(subject) => setSubject(subject)}
            value={subject}/>  

          <Text>Time</Text>
          <TextInput style={{borderColor:"black", borderWidth:1, width:"30%"}}keyboardType= 'numeric'
            onChangeText={(sdate) => setSdate(sdate)}
            value={sdate}/> 

          <Text>Description</Text>
          <TextInput style={{borderColor:"black", borderWidth:1, width:"50%", height:"40%"}} multiline={true} 
            onChangeText={(description) => setDescription(description)}
            value={description}/>

          <View style={styles.buttons}>
            <Button onPress={saveItem} title="Add" color="green" /> 
            <Button onPress={clearDB} title="Clear DB" color="red" />
            <Button onPress={clearInputs} title="Clear Input" color="yellow" />
          </View>

        </View>
      
      <FlatList 
        style={styles.bottomview}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
          <View style={styles.listcontainer}>
            <Text style={{paddingLeft:"5%"}}>Subject: {item.subject}</Text>
            <Text style={{paddingLeft:"5%"}}>Date: {item.sdate}</Text>
            <Text style={{paddingLeft:"5%"}}>Description: {item.description}</Text>
            <Text style={{paddingLeft:"5%", color:"red"}}onPress={() => deleteItem(item.id)}>DEL</Text>
          </View>} 
        data={mitem} 
        ItemSeparatorComponent={listSeparator}/>

    </View>
  );
}

const styles = StyleSheet.create({
maincontainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop:"7%",
},
inputcontainer: {
  flex: 0.6,
  marginTop: '10%',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
},
bottomview: {
  flex:1,
  marginTop:'5%',
  width:'95%',
 },
listcontainer: {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: "center",
 },
buttons: {
  marginTop: 10,
  flexDirection: "row",
  paddingLeft:"3%",
  alignItems: 'center',
  justifyContent: 'center',
 }
});