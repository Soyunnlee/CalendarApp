import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

function DayComponent({ date, state, todos, setSelectedDate, marking = {} }) {
  const isMArked = marking && marking.marked;
  console.log(isMArked);
  return (
    <View
      style={[
        tw`border-red-900 w-full flex flex-col h-20 `,
        {
          borderWidth: 2,
          backgroundColor: isMArked ? 'red' : 'blue',
        },
      ]}
    >
      <Text
        onPress={() => {
          // 날짜 선택시 호출 함수
          setSelectedDate(date.dateString);
        }}
        style={[
          tw`border-2 border-red-900  ${
            state === 'disabled' ? 'text-gray-300' : ''
          }`,
          {
            textAlign: 'center',
            // borderWidth: 2,
            color: state === 'disabled' ? 'gray' : 'black',
          },
        ]}
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

const styles = StyleSheet.create({});

export default DayComponent;
