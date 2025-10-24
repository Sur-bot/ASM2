import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateTodo } from '../redux/action/todoAction';

export default function TodoListScreen({ navigation }) {
  const todos = useSelector(state => state.todos);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [newText, setNewText] = useState('');
  const dispatch = useDispatch();
  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    // Dùng optional chaining (?.) để tránh crash
    if (event?.type === 'set' && selectedDate) {
      if (endDate && selectedDate > endDate) {
        setEndDate(null); // Reset ngày kết thúc nếu không hợp lệ
      }
      setStartDate(selectedDate);
    }
  };
  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (event?.type === 'set' && selectedDate) {
      setEndDate(selectedDate);
    }
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Tìm kiếm công việc"
        onPress={() => navigation.navigate("SearchTodo")}
      />
      <Button
        title="Thêm công việc"
        onPress={() => navigation.navigate("AddTodo")}
      />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { setSelectedTodo(item); setNewText(item.text); setModalVisible(true) }} onLongPress={() => navigation.navigate('DeleteTodo', { id: item.id })}>
            <View style={styles.item}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>
                  <Text style={styles.label}>Tên:</Text> {item.text}
                </Text>
                <Text style={styles.itemDate}>
                  <Text style={styles.label}>Bắt đầu:</Text> {new Date(item.startDate).toLocaleDateString()}
                </Text>
                <Text style={styles.itemDate}>
                  <Text style={styles.label}>Kết thúc:</Text> {new Date(item.endDate).toLocaleDateString()}
                </Text>
              </View>

              <Ionicons name="create-outline" size={30} color="black" />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}  >
        <Pressable style={styles.modalBackground} onPress={(evt) => evt.target == evt.currentTarget ? setModalVisible(false) : setModalVisible(true)}>
          <View style={styles.modalContent}>
            <TextInput style={styles.txtInput} value={newText} onChangeText={setNewText} />
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
              <Text style={styles.datePickerText}>
                {startDate ? `Bắt đầu: ${startDate.toLocaleDateString()}` : 'Chọn ngày bắt đầu'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
              <Text style={styles.datePickerText}>
                {endDate ? `Kết thúc: ${endDate.toLocaleDateString()}` : 'Chọn ngày kết thúc'}
              </Text>
            </TouchableOpacity>
             {showStartDatePicker && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate || startDate || new Date()}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
                minimumDate={startDate || new Date()}
              />
            )}
            <Button title="Lưu thay đổi" onPress={() => { dispatch(updateTodo({ id: selectedTodo.id, newText,startDate: startDate ? startDate.toISOString() : selectedTodo.startDate,endDate: endDate ? endDate.toISOString() : selectedTodo.endDate  })); setModalVisible(false); }} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "80%",

  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  txtInput: {
    width: '90%',
    borderWidth: 1, padding: 10, marginBottom: 10
  }

});

