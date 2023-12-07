import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';

function DayComponent({ date, state, todos, setSelectedDate, marking = {} }) {
  const isMArked = marking && marking.marked;
  const isSelected = marking && marking.selected;
  console.log(isMArked);
  return (
    //
    <TouchableWithoutFeedback
      onPress={() => {
        // 날짜 선택시 호출 함수
        setSelectedDate(date.dateString);
      }}
    >
      <View
        style={[
          tw`w-full flex flex-col h-16 border -mt-4 border-gray-50`,
          {
            // 선택된 날짜
            backgroundColor: isSelected ? '#F4FAFF' : '',
            overflow: 'hidden',
          },
        ]}
      >
        <Text
          style={[
            tw`border-red-900 h-full `,
            {
              textAlign: 'center',
              // 월마다 포함되는 일 만 Black 표시
              color: isMArked
                ? 'blue'
                : state === 'disabled'
                ? 'gray'
                : 'black',
              // color: 'red',
            },
          ]}
        >
          <View>
            <Text
              style={[
                tw``,
                {
                  color: isMArked
                    ? 'blue'
                    : state === 'disabled'
                    ? 'gray'
                    : 'black',
                },
              ]}
            >
              {date.day}
            </Text>
            {/* calendar 에 각 날짜에 해당하는 TodoList 를 렌더링 */}
            {todos.map((item) => (
              <View key={item.id} style={tw`mt-0.5`}>
                {date.dateString === item.date ? (
                  <Text numberOfLines={1} style={tw``}>
                    {item.text}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});

export default DayComponent;
