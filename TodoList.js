import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';

const TodoList = ({ onAddTodo, todos }) => {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      // App.js 에서 전달한 추가 함수 호출
      onAddTodo(newTodo);
      setNewTodo('');
      Keyboard.dismiss();
    }
  };

  const deleteTodo = () => {
    console.log(todos, deleteTodo);
  };

  return (
    <View style={styles.todoListContainer}>
      <TextInput
        style={styles.input}
        placeholder='Add a new todo'
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      <Button title='Add' onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <Button title='delte' onPress={deleteTodo} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoListContainer: {
    marginTop: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  todoItem: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export default TodoList;
