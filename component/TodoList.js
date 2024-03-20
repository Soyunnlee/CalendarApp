import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
} from 'react-native-heroicons/outline';

const TodoList = ({ onAddTodo, todos, onDeleteTodo, onUpdateTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [focusedInputId, setFocusedInputId] = useState(null);
  const inputRef = useRef(null);
  const [updateTodo, setUpdateTodo] = useState('');

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

  //#region 수정
  const editMode = (id, text) => {
    setFocusedInputId(id);
    setUpdateTodo(text); // 현재 todo의 택스트를 수정 상태에 설정
  };

  const saveUpdate = (id) => {
    // Focuse 해제
    setFocusedInputId(null);
    onUpdateTodo(id, updateTodo);
    setUpdateTodo('');
  };

  // ref 가 설정된 후에 focus 메서드를 호출하도록 설정
  useEffect(() => {
    if (focusedInputId !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [focusedInputId]);
  //#endregion

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
            {/* todolist */}
            <Pressable
              style={[tw`flex-1 pl-2 `]}
              onPress={() => Keyboard.dismiss()}
            >
              <TextInput
                ref={(ref) => {
                  if (focusedInputId === item.id) {
                    inputRef.current = ref;
                  }
                }}
                style={{ borderWidth: focusedInputId === item.id ? 1 : 0 }}
                editable={focusedInputId === item.id}
                value={focusedInputId === item.id ? updateTodo : item.text}
                onChangeText={(text) => setUpdateTodo(text)}
              >
                {/* {item.text} */}
              </TextInput>
            </Pressable>
            {/* deleteTodo 에 선택된 item.id 를 넘겨준다. */}
            {/* 수정버튼 */}
            {focusedInputId === item.id ? (
              // 저장
              <TouchableOpacity
                style={[tw` py-2.5 px-1 mr-2`]}
                onPress={() => {
                  saveUpdate(item.id);
                }}
              >
                <CheckIcon color='#767272' size='19' />
              </TouchableOpacity>
            ) : (
              // 수정모드
              <TouchableOpacity
                style={[tw` py-2.5 px-1 mr-2`]}
                onPress={() => {
                  editMode(item.id, item.text); // 수정모드 활성화시 현재 텍스트를 인자로 전달.
                }}
              >
                <PencilIcon color='#767272' size='19' />
              </TouchableOpacity>
            )}

            {/* <TouchableOpacity
              style={[tw` py-2.5 px-1 mr-2`]}
              onPress={() => {
                editMode(item.id);
              }}
            >
              <PencilIcon color='#767272' size='19' />
            </TouchableOpacity> */}
            {/* 삭제버튼 */}
            <TouchableOpacity
              style={[tw` py-2.5 px-1 mr-1.5`]}
              onPress={() => {
                deleteTodo(item.id);
              }}
            >
              <TrashIcon color='#767272' size='20' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default TodoList;
