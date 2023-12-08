import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {
  SparklesIcon,
  TrashIcon,
  PencilIcon,
} from 'react-native-heroicons/outline';

const TodoList = ({ onAddTodo, todos, onDeleteTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      // App.js 에서 전달한 추가 함수 호출
      onAddTodo(newTodo);
      setNewTodo('');
      Keyboard.dismiss();
    }
  };

  const deleteTodo = (id) => {
    //App 컴포넌트의 onDeleteTodo 에 delte 버튼에서 받은 item.id 를 넘겨준다.
    onDeleteTodo(id);
  };

  return (
    <View style={[]}>
      <View
        style={[
          tw``,
          {
            borderColor: '#C8C8C8',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}
      >
        <TextInput
          style={[
            tw`pl-2.5`,
            {
              flex: 1,
            },
          ]}
          placeholder='Add a new todo'
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        {/* Add Btn */}
        <TouchableOpacity onPress={addTodo} style={[tw`pr-1.5 pl-7 py-2`]}>
          <Image
            source={require('../assets/pluse.png')}
            style={[tw`w-6 h-6`]}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[tw`flex flex-row border-b items-center justify-between`]}
          >
            <Text style={[tw`flex-1 pl-2`]}>{item.text}</Text>
            {/* deleteTodo 에 선택된 item.id 를 넘겨준다. */}
            {/* <View style={[tw`space-x-flex flex-row`]}> */}
            <TouchableOpacity
              style={[tw` py-2.5 px-1 mr-2`]}
              onPress={() => {
                deleteTodo(item.id);
              }}
            >
              <PencilIcon color='#767272' size='19' />
            </TouchableOpacity>
            <TouchableOpacity
              style={[tw` py-2.5 px-1 mr-1.5`]}
              onPress={() => {
                deleteTodo(item.id);
              }}
            >
              <TrashIcon color='#767272' size='20' />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    // borderBottomWidth: 1,
    // borderColor: 'gray',
    // padding: 10,
  },
});

export default TodoList;
