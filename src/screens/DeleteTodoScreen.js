import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from '../redux/action/todoAction';
import { Ionicons } from '@expo/vector-icons';

export default function DeleteTodoScreen({ route, navigation }) {
  const { id } = route.params;
  const todo = useSelector(state => state.todos.find(t => t.id === id));
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodo(id));
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận xóa công việc?</Text>
      <Text style={styles.todoText}>{todo?.text}</Text>

      <Button title="Xác nhận" color="green" onPress={handleDelete} />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={80} color="green" />
            <Text style={styles.successText}>Xóa thành công!</Text>

            <Pressable
              style={styles.doneButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('TodoList');
              }}
            >
              <Text style={styles.doneText}>Hoàn tất</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  todoText: {
    color: 'red',
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  doneText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
