import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../redux/action/todoAction';

export default function EditTodoScreen({ route, navigation }) {
  const { id } = route.params;
  const todo = useSelector(state => state.todos.find(t => t.id === id));
  const [newText, setNewText] = useState(todo?.text || '');
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput value={newText} onChangeText={setNewText} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Lưu thay đổi" onPress={() => { dispatch(updateTodo({ id, newText })); navigation.goBack(); }} />
    </View>
  );
}
