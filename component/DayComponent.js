import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

function DayComponent({ date, state, todos, setSelectedDate, marking = {} }) {
  const isMArked = marking && marking.marked;
  const isSelected = marking && marking.selected;
  console.log(isMArked);
  return (
    <View
      style={[
        tw`border-red-900 w-full flex flex-col h-20 `,
        {
          // borderWidth: 2,
          // 선택된 날짜
          backgroundColor: isSelected ? 'blue' : '',
        },
      ]}
    >
      <Text
        onPress={() => {
          // 날짜 선택시 호출 함수
          setSelectedDate(date.dateString);
        }}
        style={[
          tw`border-red-900 h-full `,
          {
            textAlign: 'center',
            // 월마다 포함되는 일 만 Black 표시
            color: isMArked ? 'red' : state === 'disabled' ? 'gray' : 'black',
            // color: 'red',
          },
        ]}
      >
        {date.day}
      </Text>
      {/* calendar 에 각 날짜에 해당하는 TodoList 를 렌더링 */}
      {todos.map((item) => (
        <View key={item.id} style={[styles.todoText]}>
          {date.dateString === item.date ? <Text>{item.text}</Text> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});

export default DayComponent;
