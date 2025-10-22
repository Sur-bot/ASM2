import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from '../redux/todoSlice';

export default function DeleteTodoScreen({ route, navigation }) {
  const { id } = route.params;
  const todo = useSelector(state => state.todos.find(t => t.id === id));
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Xác nhận xóa công việc ?</Text>
      <Text style={{ marginBottom: 20, color: 'red', fontSize: 20 }}>{todo?.text}</Text>
      <Button title="Xác nhận" color="red" onPress={() => { dispatch(deleteTodo(id)); navigation.navigate('TodoList'); }} />
    </View>
  );
}
