import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function DayComponent({ date, state, todos, setSelectedDate }) {
  return (
    <View>
      <Text
        onPress={() => {
          // 날짜 선택시 호출 함수
          setSelectedDate(date.dateString);
        }}
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
}

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoText: {}, // Todo 스타일 추가
});

export default DayComponent;
