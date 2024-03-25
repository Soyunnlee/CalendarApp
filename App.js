import { memo, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import TodoList from './component/TodoList.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DayComponent from './component/DayComponent.js';
import tw from 'tailwind-react-native-classnames';
import CalendarListModal from './component/CalendarListModal.js';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜 저장할 상태 변수
  const [todos, setTodos] = useState([]); // Todo 목록을 저장할 상태 변수
  const todayDate = new Date().toISOString().split('T')[0]; // 오늘 날짜 지정
  const [calendarListmodalVisible, setCalendarListModalVisible] =
    useState(false); // Calendar List모달 상태
  //#region 월 메모에 쓰이는 상태변수
  const [isModalVisible, setModalVisible] = useState(false); // 모달 가시성 상태
  const [memo, setMemo] = useState(''); // 월 메모 텍스트 상태
  //#endregion

  //#region 월 메모 모달
  // 앱 시작시 메모 불러오기
  const toggleModal = async () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const loadMemo = async () => {
      try {
        const memoValue = await AsyncStorage.getItem('memo');
        if (memoValue !== null) {
          setMemo(JSON.parse(memoValue));
        }
      } catch (e) {
        console.error('메모 불러오기 실패:', e);
      }
    };

    loadMemo();
  }, []);

  useEffect(() => {
    // 모달이 닫힐 때만 메모 저장
    const saveMemo = async () => {
      try {
        if (memo) {
          // 메모가 있을 때만 저장
          await AsyncStorage.setItem('memo', JSON.stringify(memo)); // 메모를 문자열로 변환하여 저장
        }
      } catch (e) {
        console.error('메모 저장 실패:', e);
      }
    };

    if (!isModalVisible) {
      saveMemo();
    }
  }, [isModalVisible, memo]);
  //#endregion

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
        todo.id === id ? { ...todo, text: updateTodo } : todo
      )
    );
  };
  //#endregion

  // 선택한 날짜와 todo 의 날짜가 일치한 것만 필터링
  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  //#region ClaenderList 에서 날짜 선택시 호출 함수
  const onDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setCalendarListModalVisible(false);
  };
  //#endregion

  return (
    <ScrollView style={styles.container}>
      {/* 달력 컴포넌트 */}
      <View style={[tw`flex-row justify-between items-center px-4 py-2`]}>
        {/* 달력 리스트 버튼 */}
        <TouchableOpacity
          onPress={() => {
            setCalendarListModalVisible(true);
          }}
        >
          <Image
            source={require('./assets/ListIcon.png')}
            style={[tw`w-5 h-5`]}
          />
        </TouchableOpacity>

        {/* Today 버튼 */}
        <TouchableOpacity
          onPress={() => {
            setSelectedDate(todayDate);
          }}
          style={[tw`bg-gray-100 text-black rounded-md px-3.5 py-1.5`]}
        >
          <Text style={[tw`text-gray-500`]}>Today</Text>
        </TouchableOpacity>

        {/* 월 메모 버튼 */}
        <TouchableOpacity
          onPress={toggleModal}
          style={[tw`p-2`]} // Tailwind CSS 사용
        >
          <Image
            source={require('./assets/MonthIcon.png')} // 이미지 경로
            style={[tw`w-8 h-8`]} // 이미지 크기
          />
        </TouchableOpacity>
      </View>
      {/* Calendar List Modal */}
      <CalendarListModal
        modalVisible={calendarListmodalVisible}
        setModalVisible={setCalendarListModalVisible}
        onDateSelect={onDateSelect}
        selectedDate={selectedDate}
      />

      {/* 메모 모달 */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: '1%',
              }}
            >
              <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text>닫기</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder='메모를 입력하세요'
              value={memo}
              onChangeText={setMemo}
            />
          </View>
        </View>
      </Modal>

      <Calendar
        key={selectedDate}
        current={selectedDate}
        dayComponent={(props) => (
          <DayComponent
            {...props}
            todos={todos}
            setSelectedDate={setSelectedDate}
          />
        )}
        theme={{
          arrowColor: '#222B45',
          dotColor: '#00adf5',
          textDayHeaderFontSize: 12,
          'stylesheet.calendar.header': {
            week: {
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            arrow: {
              paddingHorizontal: 15,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#CED3DE',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
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
  // 월 메모 모달
  centeredView: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalView: {
    // margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    // minWidth: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    minWidth: 300,
    width: '80%',
    minHeight: '30%',
    height: 'auto',
    margin: 12,
    borderWidth: 1,
    borderColor: '#CED3DE',
    padding: 10,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
});
