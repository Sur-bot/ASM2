import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


export default function TodoListScreen({ navigation }) {
  const todos = useSelector(state => state.todos);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [newText, setNewText] = useState('');
  const dispatch = useDispatch();
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
              <Text style={{ fontSize: 18, textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.text}</Text>
              <Ionicons name="create-outline" size={30} color="black" />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}  >
        <Pressable style={styles.modalBackground} onPress={(evt) => evt.target == evt.currentTarget ? setModalVisible(false) : setModalVisible(true)}>
          <View style={styles.modalContent}>
            <TextInput style={styles.txtInput} value={newText} onChangeText={setNewText} />
            <Button title="Lưu thay đổi" onPress={() => { dispatch(updateTodo({ id, newText })); setModalVisible(false); }} />
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

  txtInput: {
    width: '90%',
    borderWidth: 1, padding: 10, marginBottom: 10
  }

});

