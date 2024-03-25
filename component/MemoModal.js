import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const MemoModal = ({ isModalVisible, toggleModal, memo, setMemo }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
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

export default MemoModal;
