import React from 'react';
import { StyleSheet, Modal, View, Button } from 'react-native';
import { CalendarList } from 'react-native-calendars';

function CalendarListModal({
  modalVisiable,
  setModalVisible,
  onDateSelect,
  selectedDate,
}) {
  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={modalVisiable}
      onRequestClose={() => {
        setModalVisible(!modalVisiable);
      }}
    >
      <View style={styles.modalView}>
        <Button title='Close' onPress={() => setModalVisible(!modalVisiable)} />
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
            },
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 50,
    marginBottom: 20,
  },
});

export default CalendarListModal;
