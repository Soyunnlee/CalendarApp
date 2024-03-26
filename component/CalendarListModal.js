import React from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';

const CalendarListModal = ({
  modalVisible,
  setModalVisible,
  onDateSelect,
  selectedDate,
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        {/* <Button title='Close' onPress={() => setModalVisible(!modalVisible)} /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 15,
          }}
        >
          <Button
            title='Close'
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
        <CalendarList
          onDayPress={onDateSelect}
          pastScrollRange={12}
          futureScrollRange={12}
          scrollEnabled={true}
          showScrollIndicator={true}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#F4FAFF',
              selectedTextColor: 'blue',
            },
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: 50,
    marginBottom: 20,
  },
});

export default CalendarListModal;
