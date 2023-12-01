import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import TodoList from './TodoList.js';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜 저장할 상태 변수
  const [todos, setTodos] = useState([]); // Todo 목록을 저장할 상태 변수

  // #region SelectedDate
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  // #endregion

  // #region addTodo
  const addTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      // 새로운 Todo를 추가하고 목록을 갱신
      setTodos([
        ...todos,
        { id: Date.now().toString(), text: newTodo, date: selectedDate },
      ]);
    }
  };

  // #endregion

  // 선택한 날짜와 todo 의 날짜가 일치한 것만 필터링
  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);
  // console.log(
  //   filteredTodos.filter((item) => {
  //     item.id;
  //   }),
  //   'filterTodos'
  // );

  const deleteTodo = () => {
    console.log(filteredTodos[0].id);
    let id = filteredTodos.filter((item) => {
      item.id;
    });
    return id;
  };

  console.log(deleteTodo(), 'deleteTodo');

  return (
    <View style={styles.container}>
      {/* 달력 컴포넌트 */}
      <Calendar onDayPress={onDayPress} style={styles.calenderWrap} />
      <Text style={styles.selectedDateText}>SelectedDate : {selectedDate}</Text>
      {/* TodoList 컴포넌트에 필터링된 Todo 목록과 추가 함수 전달 */}
      <TodoList onAddTodo={addTodo} todos={filteredTodos} />
      {/* <Button title='delete' onPress={deleteTodo} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '15%',
    // backgroundColor: '#000000',
    width: 'auto',
    borderWidth: 4,
    borderColor: '#ff0000',
  },

  calenderWrap: {
    // backgroundColor :'transparent',
  },

  selectedDateText: {},
});
