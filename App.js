import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { CalendarList, Calendar } from 'react-native-calendars';
import TodoList from './component/TodoList.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DayComponent from './component/DayComponent.js';
import tw from 'tailwind-react-native-classnames';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜 저장할 상태 변수
  const [todos, setTodos] = useState([]); // Todo 목록을 저장할 상태 변수
  const todayDate = new Date().toISOString().split('T')[0]; // 오늘 날짜 지정

  //#region (비동기) 앱 시작시 AsyncStorage에서 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
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

  // todos 가 변경될때마다 AsyncStorage 에 저장
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

  //#region 앱이 시작될때 오늘 날짜로 선택한 날짜를 지정
  useEffect(() => {
    setSelectedDate(todayDate);
  }, []);
  //#endregion

  //#region Todo 추가
  const addTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      // 이전의 Todo 목록을 가져와서 새로운 Todo 를 추가하여 설정
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now().toString(), text: newTodo, date: selectedDate },
      ]);
    }
  };
  //#endregion

  //#region Todo 삭제
  const deleteTodo = (id) => {
    // 이전의 Todo 목록에서 삭제할 Todo 를 제외하고 설정
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  //#endregion

  //#region Todo 수정
  const updateTodo = (id, updateTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id && updateTodo.trim() !== ''
          ? { ...todo, text: updateTodo }
          : todo
      )
    );
  };
  //#endregion

  // 선택한 날짜와 todo 의 날짜가 일치한 것만 필터링
  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  return (
    <ScrollView style={styles.container}>
      {/* 달력 컴포넌트 */}

      <Calendar
        dayComponent={(props) => (
          <DayComponent
            {...props}
            todos={todos}
            setSelectedDate={setSelectedDate}
          />
        )}
        theme={{
          arrowColor: 'orange',
          dotColor: '#00adf5',
          textDayHeaderFontSize: 12,
          'stylesheet.calendar.header': {
            week: {
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          },
        }}
        markedDates={{
          // '2023-12-16': { selected: true, marked: true, color: '#50cebb' },
          [todayDate]: { marked: true }, // 오늘날짜 넣기
          [selectedDate]: {
            selected: true,
          }, // 선택된 날짜 넣기
        }}
      />

      <Text style={[tw`text-center py-0.5 bg-gray-50 -mt-2 `]}>
        {selectedDate}
      </Text>

      {/* TodoList 컴포넌트에 필터링된 Todo 목록과 추가 함수 전달 */}
      <TodoList
        onAddTodo={addTodo}
        todos={filteredTodos}
        onDeleteTodo={deleteTodo}
        onUpdateTodo={updateTodo}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    width: 'auto',
    borderColor: '#ff0000',
  },
});
