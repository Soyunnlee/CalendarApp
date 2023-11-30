import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import TodoList from './TodoList.js';

export default function App() {
  const [SelectedDate, setSelectedDate] = useState('')

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  }

  return (
    <View style={styles.container}>
      <Calendar onDayPress={onDayPress} style={styles.calenderWrap}/>
      <Text style={styles.selectedDateText}>
        SelectedDate : {SelectedDate}
      </Text>
      <TodoList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop : '15%',
    // backgroundColor: '#000000',
    width: 'auto',
    borderWidth: 4,
    borderColor: '#ff0000',
  },

  calenderWrap:{
    // backgroundColor :'transparent',
  },  

  selectedDateText:{},


});
