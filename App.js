import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CalendarList, Calendar } from 'react-native-calendars';
import TodoList from './TodoList.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜 저장할 상태 변수
  const [todos, setTodos] = useState([]); // Todo 목록을 저장할 상태 변수

  // #region 비동기 AsyncStorage 관련 함수
  // ## 앱 시작시 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        //# 앱이 시작될 때 이전에 저장한 데이터를 불러오기
        const value = await AsyncStorage.getItem('todos');
        if (value !== null) {
          setTodos(JSON.parse(value));
        }
      } catch (e) {
        console.error('Error retrieving data 데이터 가져오기 실패 :', e);
      }
    };

    getData();
  }, []); // 빈 배열을 두어 한 번만 실행되도록 설정

  //## todos 가 변경될때마다 AsyncStorage 에 저장
  useEffect(() => {
    const sotreData = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (e) {
        console.error('Error storing data 데이터저장 실패 :', e);
      }
    };

    sotreData();
  }, [todos]);
  //#endregion

  // #region Date
  // ## 앱이 시작될때 오늘 날짜로 선택한 날짜를 지정
  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    setSelectedDate(todayDate);
  }, []);

  // ## SelectedDate 날짜 선택시 호출 함수
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  // #endregion

  // #region addTodo 추가
  const addTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      // 이전의 Todo 목록을 가져와서 새로운 Todo 를 추가하여 설정
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now().toString(), text: newTodo, date: selectedDate },
      ]);
    }
  };
  // #endregion

  // #region deleteTodo 삭제
  const deleteTodo = (id) => {
    // 이전의 Todo 목록에서 삭제할 Todo 를 제외하고 설정
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  // #endregion

  // 선택한 날짜와 todo 의 날짜가 일치한 것만 필터링
  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  // 각 날짜에 해당하는 컴포넌트를 커스터마이징
  const renderDayComponent = ({ date, state, marking }) => {
    console.log(marking);
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: state === 'disabled' ? 'gray' : 'black',
          }}
        >
          {date.day}
        </Text>
        {/* calendar 에 각 날짜에 해당하는 TodoList 를 렌더링 */}
        {todos.map((item) => (
          <Text key={item.id} style={styles.todoText}>
            {date.dateString === item.date ? <Text>{item.text}</Text> : null}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 달력 컴포넌트 */}
      <Calendar
        onDayPress={onDayPress}
        // markedDates={{
        //   [selectedDate]: {
        //     selected: true,
        //     selectedColor: '#EDF2FF',
        //     selectedTextColor: '#0047FF',
        //   },
        // }}
        markedDates={marking}
        dayComponent={renderDayComponent}
        style={styles.calenderWrap}
      />

      <Text style={styles.selectedDateText}>SelectedDate : {selectedDate}</Text>
      {/* TodoList 컴포넌트에 필터링된 Todo 목록과 추가 함수 전달 */}
      <TodoList
        onAddTodo={addTodo}
        todos={filteredTodos}
        onDeleteTodo={deleteTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

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
