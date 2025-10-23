import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/action/todoAction'; // Import action
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTodoScreen({ navigation }) {
    const [text, setText] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

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

    const handleAddTodo = () => {
        if (!text.trim() || !startDate || !endDate) {
            setModalVisible(true);
            return;
        }

        dispatch(addTodo({ 
            text, 
            startDate: startDate.toISOString(), 
            endDate: endDate.toISOString() 
        }));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Nhập công việc mới..." 
                value={text} 
                onChangeText={setText} 
                style={styles.input} 
            />
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
            <Button title="Thêm" onPress={handleAddTodo} />

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

            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Vui lòng nhập công việc và chọn thời gian bắt đầu, kết thúc.</Text>
                        <Button title="Đồng ý" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
// Styles (giữ nguyên)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});